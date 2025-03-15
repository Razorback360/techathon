"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/fade-in";
import { Plus, Minus, User, CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IdCardPreview } from "@/components/id-card-preview";
import { getPresignedUrls, handleUpload } from "@/lib/minio/client";
import type { PresignedUrlProp } from "@/lib/minio/server";

// Add this placeholder function for file uploads at the top of the file, after the imports
// This is where you'll plug in your file upload implementation
async function uploadFile(file: File): Promise<PresignedUrlProp[]> {
  // This is a placeholder - replace with your actual file upload implementation
  console.log("Uploading file:", file.name);

  // Simulate upload delay
  const data = await getPresignedUrls(
    [{
      originalFileName: file.name,
      fileSize: file.size,
    }]
  );
  const callback = (e: number) => {
    console.log(e)
  }
  await handleUpload([file], data, () => { console.log("hiii") }, callback, callback);

  // Return a mock URL - your implementation should return the actual uploaded file URL
  return data;
}

// Form validation schema for team information
const teamInfoSchema = z.object({
  isFromKFUPM: z.enum(["yes", "no"], {
    required_error: "Please select whether your team is from KFUPM.",
  }),
  teamName: z
    .string()
    .min(2, { message: "Team name must be at least 2 characters." }),
  leaderPhone: z
    .string()
    .min(10, { message: "Please enter a valid phone number." }),
  leaderEmail: z
    .string()
    .email({ message: "Please enter a valid email address." }),
});

// Schema for a single team member
const teamMemberSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  nationalId: z.string().min(1, { message: "National ID is required." }),
  university: z.string().min(1, { message: "University name is required." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  studentIdCard: z
    .instanceof(File, {
      message: "Student ID card is required for verification.",
    })
    .refine((file) => file.size < 5000000, "File size must be less than 5MB")
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(
          file.type,
        ),
      "File must be an image (JPEG, PNG) or PDF",
    ),
});

// Schema for team members array
const teamMembersSchema = z.object({
  members: z
    .array(teamMemberSchema)
    .min(3, { message: "You must have at least 3 team members." })
    .max(5, { message: "You can have a maximum of 5 team members." }),
});

// Schema for project idea
const projectIdeaSchema = z.object({
  projectIdea: z.string().min(50, {
    message: "Please provide a detailed project idea (minimum 50 characters).",
  }),
});

// Combined schema for the entire form
const registrationSchema = z.object({
  ...teamInfoSchema.shape,
  ...teamMembersSchema.shape,
  ...projectIdeaSchema.shape,
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

// Default empty team member
const emptyMember = {
  name: "",
  nationalId: "",
  university: "",
  phone: "",
  email: "",
  studentIdCard: undefined,
};

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedMembers, setExpandedMembers] = useState<
    Record<number, boolean>
  >({
    0: true,
    1: true,
    2: true,
  });

  // Initialize form with default values
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      isFromKFUPM: undefined,
      teamName: "",
      leaderPhone: "",
      leaderEmail: "",
      members: [{ ...emptyMember }, { ...emptyMember }, { ...emptyMember }],
      projectIdea: "",
    },
    mode: "onChange",
  });

  const members = form.watch("members");
  // Add a new team member
  const addTeamMemberWithExpanded = () => {
    if (members.length < 5) {
      const newIndex = members.length;
      // @ts-expect-error - there's no file at the beginning of each member
      form.setValue("members", [...members, { ...emptyMember }]);
      setExpandedMembers((prev) => ({
        ...prev,
        [newIndex]: true,
      }));
    }
  };

  // Remove a team member
  const removeTeamMember = (index: number) => {
    if (members.length > 3) {
      const updatedMembers = [...members];
      updatedMembers.splice(index, 1);
      form.setValue("members", updatedMembers);
    }
  };

  // Function to check if all fields for a member are valid
  const isMemberValid = (index: number) => {
    const memberFields = [
      `members.${index}.name`,
      `members.${index}.nationalId`,
      `members.${index}.university`,
      `members.${index}.phone`,
      `members.${index}.email`,
      `members.${index}.studentIdCard`,
    ];

    return memberFields.every((field) => {
      const fieldState = form.getFieldState(
        field as Parameters<typeof form.getFieldState>[0],
      );
      return fieldState.isDirty && !fieldState.error;
    });
  };

  // Toggle expanded/collapsed state for a member card
  const toggleMemberCard = (index: number) => {
    setExpandedMembers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Handle form submission
  async function onSubmit(data: RegistrationFormValues) {
    setIsSubmitting(true);

    try {

      // Step 1: Upload all files first
      const fileUploadPromises = data.members.map(async (member, index) => {
        if (member.studentIdCard) {
          try {
            const file = await uploadFile(member.studentIdCard);
            return { success: true, index, file };
          } catch (error) {
            console.error(
              `Failed to upload ID card for member ${index + 1}:`,
              error,  
            );
            return { success: false, index, error };
          }
        }
        return { success: false, index, error: "No file provided" };
      });

      const uploadResults = await Promise.all(fileUploadPromises);

      // Check if all uploads were successful
      const failedUploads = uploadResults.filter((result) => !result.success);

      if (failedUploads.length > 0) {
        alert(
          `Failed to upload ${failedUploads.length} files. Please try again.`,
        );
        return;
      }
      console.log("hi")
      // Here you would typically send the form data to your backend
      await fetch("/api/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: data.teamName, proposal: data.projectIdea}),
      });
      console.log("hi000")
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      data.members.forEach(async(member, index) => {
      console.log("hi")

        await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: member.name,
            email: member.email,
            nationalId: member.nationalId,
            university: member.university,
            phone: member.phone,
            fileId: uploadResults[index] ? uploadResults[index].file ? uploadResults[index].file[0] ? uploadResults[index].file[0].id : "" : "" : "",
            teamName: data.teamName,
          }),
        });
      })

      // Simulate API call
      // Show success message or redirect
      console.log("hi10")

      alert("Registration submitted successfully!");
      form.reset();
      setCurrentStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "There was an error submitting your registration. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Navigate to next step
  const nextStep = async () => {
    if (currentStep === 1) {
      // Validate team information fields
      const teamInfoValid = await form.trigger([
        "isFromKFUPM",
        "teamName",
        "leaderPhone",
        "leaderEmail",
      ]);
      if (!teamInfoValid) return;
    }

    if (currentStep === 2) {
      // Validate all team members including file uploads
      const membersValid = await form.trigger("members");

      // Additional check to ensure all members have ID cards
      const allMembersHaveFiles = form
        .getValues("members")
        .every((member) => member.studentIdCard instanceof File);

      if (!membersValid || !allMembersHaveFiles) {
        if (!allMembersHaveFiles) {
          alert(
            "Please upload student ID cards for all team members before proceeding.",
          );
        }
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await form.handleSubmit(onSubmit)();
    }
  };

  // Go back to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="border-neon-blue/30 mb-8 border-b pb-4">
        <FadeIn>
          <h3 className="text-gradient mb-2 text-2xl font-bold">
            {currentStep === 1 && "Team Information"}
            {currentStep === 2 && "Team Member Details"}
            {currentStep === 3 && "Project Idea"}
          </h3>
          <p className="text-muted-foreground">
            {currentStep === 1 && "Provide basic information about your team."}
            {currentStep === 2 &&
              "Add details for each team member (minimum 3, maximum 5)."}
            {currentStep === 3 &&
              "Describe your project idea for the hackathon."}
          </p>
        </FadeIn>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          {/* Step 1: Team Information */}
          {currentStep === 1 && (
            <FadeIn staggerChildren staggerDelay={0.1}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="isFromKFUPM"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-foreground font-body">
                        Are you from KFUPM? *
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex w-full gap-2"
                        >
                          <div className="flex w-full gap-2">
                            <Button
                              type="button"
                              variant={
                                field.value === "yes" ? "secondary" : "outline"
                              }
                              className="w-1/2 justify-center"
                              onClick={() => field.onChange("yes")}
                            >
                              Yes
                            </Button>
                            <Button
                              type="button"
                              variant={
                                field.value === "no" ? "destructive" : "outline"
                              }
                              className="w-1/2 justify-center"
                              onClick={() => field.onChange("no")}
                            >
                              No
                            </Button>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teamName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-body">
                        Team Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your team name"
                          {...field}
                          className="bg-background/50 border-neon-blue/50 focus:border-neon-blue"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-neon-blue/20 border-t pt-4">
                  <h4 className="mb-3 text-lg font-medium">
                    Team Leader Contact Information
                  </h4>
                </div>

                <FormField
                  control={form.control}
                  name="leaderPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-body">
                        Phone Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter team leader's phone number"
                          {...field}
                          className="bg-background/50 border-neon-blue/50 focus:border-neon-blue"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="leaderEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-body">
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter team leader's email address"
                          {...field}
                          className="bg-background/50 border-neon-blue/50 focus:border-neon-blue"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FadeIn>
          )}

          {/* Step 2: Team Member Details */}
          {currentStep === 2 && (
            <FadeIn>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium">
                    Team Members ({members.length}/5)
                  </h4>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={addTeamMemberWithExpanded}
                    disabled={members.length >= 5}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" /> Add Member
                  </Button>
                </div>

                <FormMessage>
                  {form.formState.errors.members?.message}
                </FormMessage>

                <Accordion
                  type="multiple"
                  defaultValue={["0", "1", "2"]}
                  value={Object.entries(expandedMembers)
                    .filter(([_, isExpanded]) => isExpanded)
                    .map(([index]) => index)}
                  onValueChange={(value) => {
                    const newExpandedState: Record<number, boolean> = {};
                    members.forEach((_, index) => {
                      newExpandedState[index] = value.includes(
                        index.toString(),
                      );
                    });
                    setExpandedMembers(newExpandedState);
                  }}
                  className="space-y-4"
                >
                  {members.map((_, index) => {
                    const isValid = isMemberValid(index);
                    const isExpanded = expandedMembers[index] !== false;

                    return (
                      <AccordionItem
                        key={index}
                        value={index.toString()}
                        className={`overflow-hidden rounded-lg border ${
                          isValid && !isExpanded
                            ? "border-green-500 bg-green-500/10"
                            : "border-neon-blue/30"
                        }`}
                      >
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User
                                className={`h-5 w-5 ${isValid ? "text-green-500" : "text-neon-blue"}`}
                              />
                              <h5 className="text-md font-medium">
                                Team Member {index + 1}
                              </h5>

                              {isValid && !isExpanded && (
                                <>
                                  <span className="mx-2">|</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                      {form.getValues(`members.${index}.name`)}
                                    </span>
                                    <span className="text-muted-foreground font-body mx-1">
                                      •
                                    </span>
                                    <span className="font-medium">
                                      {form.getValues(
                                        `members.${index}.nationalId`,
                                      )}
                                    </span>
                                  </div>
                                  <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                                </>
                              )}
                            </div>

                            {members.length > 3 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeTeamMember(index);
                                }}
                                className="mr-2 flex items-center gap-1 border-0 bg-red-500 text-white hover:bg-red-600"
                              >
                                <Minus className="h-4 w-4" /> Remove
                              </Button>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-0 pb-4">
                          <div className="border-neon-blue/20 space-y-4 border-t pt-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <FormField
                                control={form.control}
                                name={`members.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-foreground font-body">
                                      Full Name *
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter full name"
                                        {...field}
                                        className="bg-background/50 border-neon-blue/50 focus:border-neon-blue"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`members.${index}.nationalId`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-foreground font-body">
                                      National ID *
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter national ID"
                                        {...field}
                                        className="bg-background/50 border-neon-blue/50 focus:border-neon-blue"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name={`members.${index}.university`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground font-body">
                                    University Name *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter university name"
                                      {...field}
                                      className="bg-background/50 border-neon-blue/50 focus:border-neon-blue"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <FormField
                                control={form.control}
                                name={`members.${index}.phone`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-foreground font-body">
                                      Phone *
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter phone number"
                                        {...field}
                                        className="bg-background/50 border-neon-blue/50 focus:border-neon-blue"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`members.${index}.email`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-foreground font-body">
                                      Email Address *
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="email"
                                        placeholder="Enter email address"
                                        {...field}
                                        className="bg-background/50 border-neon-blue/50 focus:border-neon-blue"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="border-neon-blue/20 mt-4 border-t pt-4">
                              <FormField
                                control={form.control}
                                name={`members.${index}.studentIdCard`}
                                render={({
                                  field: { value, onChange, ...fieldProps },
                                }) => (
                                  <FormItem>
                                    <FormLabel className="text-foreground">
                                      Student ID Card *
                                    </FormLabel>
                                    <FormDescription>
                                      Upload a clear image or PDF of your
                                      university student ID card for
                                      verification.
                                    </FormDescription>
                                    <div className="flex items-start gap-4">
                                      <FormControl>
                                        <div className="flex flex-col gap-2">
                                          <IdCardPreview
                                            file={value}
                                            onChange={(file) => onChange(file)}
                                            onRemove={() => onChange(undefined)}
                                            inputId={`student-id-${index}`}
                                            showUploadControls={true}
                                          />
                                          <FormMessage />
                                        </div>
                                      </FormControl>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </FadeIn>
          )}

          {/* Step 3: Project Idea */}
          {currentStep === 3 && (
            <FadeIn>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="projectIdea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-body">
                        Project Idea *
                      </FormLabel>
                      <FormDescription>
                        Assume the hackathon theme is to come up with your own
                        idea and execute it. Please present your idea. Note that
                        this will be used for qualification.
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project idea in detail"
                          className="bg-background/50 border-neon-blue/50 focus:border-neon-blue min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Review Summary */}
                <div className="bg-background/50 border-neon-blue/30 mt-8 rounded-md border p-6">
                  <h3 className="text-neon-blue mb-4 text-lg font-medium">
                    Registration Summary
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <span className="text-muted-foreground font-body">
                        Team Name:
                      </span>{" "}
                      <span className="font-medium">
                        {form.getValues("teamName")}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground font-body">
                        From KFUPM:
                      </span>{" "}
                      <span className="font-medium">
                        {form.getValues("isFromKFUPM") === "yes" ? "Yes" : "No"}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground font-body">
                        Team Leader Contact:
                      </span>{" "}
                      <div className="mt-1 ml-4">
                        <div>
                          <span className="text-muted-foreground font-body">
                            Phone:
                          </span>{" "}
                          {form.getValues("leaderPhone")}
                        </div>
                        <div>
                          <span className="text-muted-foreground font-body">
                            Email:
                          </span>{" "}
                          {form.getValues("leaderEmail")}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-muted-foreground font-body">
                        Team Size:
                      </span>{" "}
                      <span className="font-medium">
                        {form.getValues("members").length} members
                      </span>
                    </div>

                    {/* Team Members Summary */}
                    <div className="border-neon-blue/20 border-t pt-2">
                      <h4 className="mb-3 font-medium">Team Members:</h4>
                      <div className="space-y-3">
                        {form.getValues("members").map((member, index) => (
                          <div
                            key={index}
                            className="bg-background/30 rounded-md p-3"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                {member.studentIdCard && (
                                  <IdCardPreview
                                    file={member.studentIdCard}
                                    previewSize="sm"
                                  />
                                )}
                                <div>
                                  <div className="font-medium">
                                    {member.name || "Not provided"}
                                  </div>
                                  <div className="text-muted-foreground mt-1 text-sm">
                                    ID: {member.nationalId || "Not provided"}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right text-sm">
                                <div>{member.university || "Not provided"}</div>
                                <div className="text-muted-foreground mt-1">
                                  {member.phone || "No phone"} |{" "}
                                  {member.email || "No email"}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.3}>
            <div className="flex justify-between pt-4">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              <Button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className={
                  currentStep === 3
                    ? "bg-neon-green text-background animate-neon-green-pulse"
                    : ""
                }
              >
                {currentStep < 3
                  ? "Next"
                  : isSubmitting
                    ? "Submitting..."
                    : "Submit Registration"}
              </Button>
            </div>
          </FadeIn>
        </form>
      </Form>
    </div>
  );
}
