
export default function ProfileId({ params }: { params: { profileid: string } }) {
    const { profileid } = params;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-[2rem]">Profile Page</h1>
            <hr />
            <br />

            <h2 className="p-3 bg-green-500 text-black">{profileid}</h2>
        </div>
    )
}
