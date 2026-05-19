"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, ImageIcon, Save, Check } from "lucide-react"

export default function ProfileForm() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        fetch("/api/profile")
            .then(r => r.json())
            .then(data => {
                setName(data.user?.name ?? "")
                setImage(data.user?.image ?? "")
            })
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        await fetch("/api/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, image }),
        })
        setLoading(false)
        setSuccess(true)
        router.refresh()
        setTimeout(() => setSuccess(false), 2000)
    }

    return (
        <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User size={20} className="text-amber-500" />
                Edit Profile
            </h2>
            <div className="flex flex-col gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-1">
                        <User size={14} className="text-amber-400" /> Name
                    </label>
                    <input
                        type="text"
                        className="w-full border border-amber-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-1">
                        <ImageIcon size={14} className="text-amber-400" /> Image URL
                    </label>
                    <input
                        type="text"
                        className="w-full border border-amber-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 w-full font-semibold py-3 rounded-xl transition duration-200 ${
                        success
                            ? "bg-green-50 text-green-500 border border-green-200"
                            : "bg-amber-500 hover:bg-amber-600 text-white"
                    } disabled:opacity-50`}
                >
                    {loading ? "Saving..." : success ? <><Check size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
                </button>
            </div>
        </div>
    )
}