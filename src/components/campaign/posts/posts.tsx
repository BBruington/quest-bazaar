"use-client"
import { useState } from "react"
// model UserPost {
//   id          String    @id @default(cuid())
//   userId      String
//   title       String
//   description String
//   author      String
//   mainImage   String
//   body        String
//   createdAt   DateTime  @default(now())
//   updatedAt   DateTime  @updatedAt
//   user        User      @relation(fields: [userId], references: [id])
//   likes       Like[]
//   comments    Comment[]
// }

export default function Post() {
  const [post, setPost] = useState({})
  return (
    <main>

        <img className="w-full h-40 object-cover" src={''} alt='' />
        <article className="max-w-3xl mx-auto p-5">

          <h1 className="text-3xl mt-10 mb-3">post title</h1>
        
          <h2 className="text-xl font-light text-gray-500 mb-2">post description</h2>

          <div className="flex items-center space-x-2">

            <img className="h-10 w-10 rounded-full" src={'authorimg'} alt='' />
          
            <p className="font-extralight text-sm">
              Blog post by <span className="text-green-600">author name</span> - Published at{" "} 
            {/* {new Date(post._createdAt).toLocaleString()} */}</p>
          
          </div>

        </article>

      </main>
  )
}