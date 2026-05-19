// src/app/profile/page.tsx
import { auth } from "@/services/auth";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";
import OrderHistory from "@/components/OrderHistory";

export default async function ProfilePage() {
    const session = await auth();
    if (!session) redirect("/signin");

    return (
        <div className="max-w-4xl mx-auto p-6 flex flex-col gap-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <ProfileForm />
            <OrderHistory />
        </div>
    )
}