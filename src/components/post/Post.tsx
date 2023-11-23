import { Button } from "../ui/button";


export default function CampaignPost() {

  return (
    <div className="flex flex-col bg-accent-foreground w-full justify-center m-5">
      <div className="flex justify-around m-2 mt-5 items-center">
        <div className="flex flex-col bg-slate-700 rounded-lg space-y-5 w-full lg:w-2/3 xl:w-1/2">
          <h1 className="text-slate-300 text-4xl p-2">Title of campaign</h1>
          <div className="flex flex-col text-slate-300 space-y-1 ml-2">
            <span>4 players</span>
            <div>
              from <span>lvl 1</span> to <span>lvl 3</span>
            </div>
          </div>
          <div className="p-5 text-slate-300">I am looking to make a casual game for around 3 sessions. I am not particularly picky but please keep in mind that what ever you come up with for the 
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