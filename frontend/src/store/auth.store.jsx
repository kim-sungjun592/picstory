import React ,{createContext, useContext,useMemo,useState,useEffect} from 'react'

import {getMe} from '../api/auth.api'
const AuthCtx =createContext(null)

export function AuthProvider({children}){

  const [member, setMember]=useState(null)
  const [ready, setReady]=useState(false)


  const [token, setToken]=useState(localStorage.getItem('accessToken'))


  useEffect(()=>{
    let mounted = true

    const bootstrapAuth = async()=>{
      try {
        const data = await getMe()

        if(mounted){
          setMember(data)
        }
      } catch {
        if(mounted){
          setMember(null)
        }

      }finally{
        if(mounted){
          setReady(true)
        }
      }
    }
    bootstrapAuth()

    return ()=>{
      mounted=false
    }

  },[])


  const login =(memberData)=>{
   setMember(memberData)
  }

  const logout=()=>{
 setMember(null)
  }

  const value =useMemo(()=>({
    member,
    ready,
    isAuthed:!!member,
    login,
    logout

  }),[member, ready])

  return <AuthCtx.Provider value={value}>
    {children}
  </AuthCtx.Provider>

}


export const useAuth = ()=>useContext(AuthCtx)