"use client"

import {useState} from "react"

export default function Form(){
    const [isKFUPM,setKFUPM] = useState<Boolean | null>(null)
    return (
        <>
            <form action="">
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
                
                <label htmlFor="team-tag">Team Tag: </label>
                <input id="team-tag" type="text" name="team-tag" required/>

                {isKFUPM === true && <div className="student-form">
                    <label htmlFor="student-id">Student Id:</label>
                    <input id="student-id" type="text" name="student-id" required/>
                </div>}

                {isKFUPM === false && <div className="national-form">
                    <label htmlFor="national-id">Iqama / National Id:</label>
                    <input id="national-id" type="text" name="national-id" required/>
                </div>}
                
                <label htmlFor="propsoal">Propsoal: </label>
                <textarea name="propsoal" id="propsoal" placeholder="Type your proposal here"></textarea>

            </form>
        </>
    )
}