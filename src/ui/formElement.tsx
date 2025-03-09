"use client"

import {useState} from "react"
import {registerStudents} from "@/actions/actions"
export default function Form(){
    const [isKFUPM,setKFUPM] = useState<Boolean | null>(null)
    return (
        <>
            <form action={registerStudents}>
                <label htmlFor="name">Full Name:</label>
                <input id="name" type="text" name="name" required/>

                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required/>

                <label htmlFor="">Are you a KFUPM student</label>
                <div>
                    <input type="radio" id="is-kfupm-yes" name="isKfupm" value="Yes" onChange={() => setKFUPM(true)}/>
                    <label htmlFor="is-kfupm-yes">Yes</label>
                </div>

                <div>
                    <input type="radio" id="is-kfupm-no" name="isKfupm" value="No" onChange={() => setKFUPM(false)}/>
                    <label htmlFor="is-kfupm-no">No</label>
                </div>

                <label htmlFor="phoneNum">Phone Number:</label>
                <input id="phoneNum" type="text" name="phoneNum" required/>
                
                <label htmlFor="teamTag">Team Tag: </label>
                <input id="team-tag" type="text" name="teamTag" required/>

                {isKFUPM === true && <div className="student-form">
                    <label htmlFor="studentId">Student Id:</label>
                    <input id="student-id" type="text" name="studentId" required/>
                </div>}

                {isKFUPM === false && <div className="national-form">
                    <label htmlFor="nationalId">Iqama / National Id:</label>
                    <input id="national-id" type="text" name="nationalId" required/>
                </div>}
                
                <label htmlFor="proposal">Proposal: </label>
                <textarea name="proposal" id="proposal" placeholder="Type your proposal here"></textarea>

                <button type="submit">Submit</button>
            </form>
        </>
    )
}