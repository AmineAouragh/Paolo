import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { useState, useEffect } from "react"
import { Boldonse, Poppins } from 'next/font/google'
import { initializePaddle } from "@paddle/paddle-js"
import { supabaseClient } from "./api/supabaseClient"
import { client } from "../pages/api/auth"

const boldonse = Boldonse({
    subsets: ['latin'],
    weight: '400',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: '300'
})

const poppinsBold = Poppins({
  subsets: ['latin'],
  weight: '200'
})

export default function Home() {

  const [ paddleInstance, setPaddleInstance ] = useState(null)

  let productItem = [
    {
      priceId: process.env.NEXT_PUBLIC_FAKE_PRICE_ID
    }
  ]

  async function openCheckout(){
      const paddle = await initializePaddle({
        token: process.env.NEXT_PUBLIC_PAOLO_PADDLE_TEST_CLIENT_SIDE_TOKEN,
        environment: "sandbox",
        eventCallback: (data) => {
          if (data.name == "checkout.completed"){
            console.log(data)
          }
        }
      })
      paddle.Checkout.open({
        items: productItem,
      })
  }

  const placeholders = [
    "A SaaS that helps creators turn long videos into short clips...",
    "A tool that helps small businesses manage inventory across stores...",
    "An app that helps students summarize lectures instantly...",
    "A platform that helps freelancers find high-quality clients..."
  ]

  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const [idea, setIdea] = useState("")

  useEffect(() => {
    const current = placeholders[index]
    let speed = isDeleting ? 40 : 70

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1))
        if (text === current) {
          setTimeout(() => setIsDeleting(true), 1200) // pause before deleting
        }
      } else {
        setText(current.substring(0, text.length - 1))
        if (text === "") {
          setIsDeleting(false)
          setIndex((prev) => (prev + 1) % placeholders.length)
        }
      }
    }, speed);

    return () => clearTimeout(timeout)
  }, [text, isDeleting, index])
  
  return (
    <>
      <Head>
        <title>Paolo - Research Your Competitors In Minutes, Not Days</title>
      </Head>
      <div className="bg-[#060620] flex flex-col justify-center items-center min-h-screen w-full">
          <div id="topnav" className="hidden w-full py-6 px-6 flex flex-row items-center justify-between">
            <p className="font-bold text-white text-3xl">Paolo</p>
            <ul id="navlist" className="hidden flex flex-row items-center">
              <li className="mr-6 text-2xl text-white">How it works</li>
              <li className="mr-6 text-2xl text-white">Pricing</li>
              <li className="mr-6 text-2xl text-white">Sign in</li>
              <button type="button" className="px-8 py-4 bg-[#F6DC3B] rounded-lg text-2xl">Validate your idea</button>
            </ul>
          </div>
          <div id="hero_section" className="w-full py-20 flex flex-col justify-center items-center">
            <div className="py-20 flex flex-col justify-center items-center w-full sm:w-3/4 md:w-2/3 xl:w-1/2">
              <h2 className={`mb-8 text-xl text-white ${boldonse.className}`}>Paolo</h2>
              <h1 className={`text-center text-white text-5xl ${boldonse.className} leading-[92px]`}>Research Your Competitors In Minutes, Not Days</h1>
              <p className={`${poppinsBold.className} text-center text-white mt-10 text-xl`}>Just describe your business idea and Paolo takes care of the rest.</p>
              <div className="w-3/4 flex flex-col border-2 border-[#F6DC3B] shadow-lg shadow-[#F6DC3B] rounded-lg mt-10">
                <textarea 
                  id="input_field" 
                  placeholder={text} 
                  onFocus={() => setText("")}
                  rows={4} 
                  cols={20}
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)} 
                  className={`${poppins.className} placeholder-gray-300 text-2xl text-[#F6DC3B] w-full focus:outline-none p-4`}>

                </textarea>
                <div className="p-4 flex flex-row items-center justify-between">
                  <div>

                  </div>
                  <button type="button" className="bg-[#F6DC3B] p-4 rounded-lg text-xl font-bold">
                    <p className={`${boldonse.className}`}>Start</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div> 
    </>
  );
}
