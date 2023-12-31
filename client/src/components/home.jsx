import React, { useEffect, useState } from 'react'
import useAuth from '../shared/hooks/useAuth'
import Modal from '../shared/components/modals/modal'
import { SignUp } from './auth/signUp'
import { getApi } from '../shared/services/services'
import { MY_INFO_URL } from '../shared/constant/constant'

const Home = () => {

/**
 * p - padding
 * m - margin
 * pt - padding top
 * pb - padding bottom
 * pl - padding left
 * pr - padding right
 * mt - margin top
 * mb - margin bottom
 * ml - margin left
 * mr - margin right
 * - [px]
 * - [rem]
 * - [em]
 * - [vh]
 * - [vw]
 * - [%]
 * Todo:Display Flex
 * display: flex - flex
 * flex-direction: row - flex-row
 * flex-wrap: wrap - flex-wrap
 * align-items: center - item-center
 * justify-content: center - justify-center
 * 
 * TODO:Fonts
 * color text -  text-yellow-200
 * text-align: center - text-center
 * font-size: 40px - text-[40px]
 * text-decoration: underline - underline
 * 
 * TODO:Background
 * background-image: url(https://images.unsplash.com/photo-150 - bg-[url('/img/hero-pattern.svg')]
  background-size: cover - bg-cover
  background-position: center - bg-center
*/
  const myInfo =async () =>{
    const {data} = await getApi(MY_INFO_URL)
  }
  const {user,modal:{isSignIn,show,showHideModal}} = useAuth()
 
  return (
    <div>
      <h1>Home</h1>
      <button onClick={()=>{
        myInfo()
      }}>My iNfo</button>
    </div>
  )
}

export default Home