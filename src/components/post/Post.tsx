import { Button } from "../ui/button";


export default function CampaignPost() {

  return (
    <div className="flex flex-col bg-accent-foreground w-full justify-center m-5">
      <img
          className="h-40 w-full object-cover"
          src={"https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg"
          }
          alt=""
        />
        <article className="mx-auto max-w-3xl p-5">
          <h1 className="mb-3 mt-8 text-slate-300 text-4xl p-2">Title</h1>

          <div className="flex items-center space-x-2">
            {/* <img className="h-10 w-10 rounded-full" src={urlFor(post.author.image).url()} alt='' /> */}

            <p className="text-sm font-extralight text-slate-300">
              By: <span className="text-green-300">beny boy</span> -
              Published at {new Date().toLocaleString()}
            </p>
          </div>
        </article>
      <div className="flex justify-around m-2 mt-5 items-center">
        <div className="flex flex-col pt-5 bg-slate-800 rounded-lg space-y-5 w-full lg:w-2/3 xl:w-1/2">
          <div className="flex flex-col text-slate-300 space-y-1 ml-2">
            <span>4 players</span>
            <div>
              from <span>lvl 1</span> to <span>lvl 3</span>
            </div>
          </div>
          <div className="py-5 mx-2 text-slate-300">I am looking to make a casual game for around 3 sessions. I am not particularly picky but please keep in mind that what ever you come up with for the 
            game, it HAS to work with the rest of the group.
          </div>
            <Button>Join</Button>
        </div>
      </div>

      <div className="flex justify-center rounded-lg w-full text-slate-300 bg-accent-foreground">
        <div className=" flex w-full xl:w-1/2 lg:w-2/3 bg-foreground m-3 rounded-lg p-2">
          here it can get into much more detail on the game some more details etc... 
        </div>
      </div>

    </div>
  )
}