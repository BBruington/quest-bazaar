import { Link } from "lucide-react";
const campaignPosts = [0,0]

export default function DisplayPosts() {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 p-3 items-center lg:grid-cols-2 md:gap-6 md:p-6 2xl:grid-cols-3 ">
        {campaignPosts?.map((post, index) => (
          <Link className="" key={index} href={`/post/${index}`}>
            <div className="group cursor-pointer overflow-hidden rounded-lg border border-primary-foreground">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src="https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg"
                alt="Post main image"
              />
              <div className="flex justify-between bg-accent-foreground p-5 ">
                <div>
                  <p className="text-lg font-bold text-white">
                    {"awesome title for the game".substring(0, 30)}
                  </p>
                  <div className="flex space-x-5">
                    <p className="flex text-xs text-white">
                        <>By: author</>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}