import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex justify-center items-center bg-[#0d0d0d] h-screen w-full'>
            <SignIn />
        </div>
    )

}