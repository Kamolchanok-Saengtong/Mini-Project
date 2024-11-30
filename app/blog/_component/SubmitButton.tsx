"use client"
import { useFormStatus } from "react-dom"
import {style} from "../constants/style"

export default function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus()
    return <button className="rounded-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
   disabled={pending} type="submit">
        {pending ? "Submitting..." : label}
    </button>
}