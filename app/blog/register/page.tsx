"use client"
import { useActionState } from "react"  // Change this line
import register from "../_actions/register"
import { redirect } from "next/navigation"
import Link from "next/link"
import SubmitButton from "../_component/SubmitButton"
import { style } from "../constants/style"

export default function Register() {

    const [data, action] = useActionState(register, {})  // Change useFormState to useActionState

    if (data.message) {
        redirect("/blog")
    }

    return (
        <div>
            Register
            <hr />
            <form action={action} className="mt-4">
                <div className="flex flex-col mb-2">
                    <label htmlFor="email">Email</label>
                    <input className={style} type="email" name="email" id="email" required />
                    {data.error?.email && <div className="text-red-600">{data.error?.email[0]}</div>}
                </div>
                <div className="flex flex-col mb-2">
    <label htmlFor="username">Username</label>
    <input className={style} type="text" name="username" id="username" required />
    {data.error?.username && <div className="text-red-600">{data.error?.username[0]}</div>}
</div>


                <div className="flex flex-col mb-6">
                    <label htmlFor="password">Password</label>
                    <input className={style} type="password" name="password" id="password" required />
                    {data.error?.password && <div className="text-red-600">{data.error?.password[0]}</div>}
                </div>

                {/* === Todo 4: add new user with validation === */}
                <div>
                    {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
                </div>
                <div>
                    {data.message ? <p>{data.message}</p> : <SubmitButton label="Register" />}
                </div>
            </form>
            <br /><hr />
            <Link href="/blog">Back</Link>
        </div>
    )
}
