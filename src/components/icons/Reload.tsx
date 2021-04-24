import { ComponentPropsWithoutRef } from 'react';

export function Reload(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" {...props}>
      <mask id="a" fill="currentColor">
        <path d="M7.378 5.481h2.741v-2.8h-.8v2H7.378v.8z"/>
        <path d="M9.682 4.318a4.5 4.5 0 100 6.364l-.666-.666a3.558 3.558 0 110-5.032l.333-.333.333-.333z"/>
      </mask>
      <path fill="currentColor" d="M7.378 5.481h2.741v-2.8h-.8v2H7.378v.8z"/>
      <path fill="currentColor" d="M9.682 4.318a4.5 4.5 0 100 6.364l-.666-.666a3.558 3.558 0 110-5.032l.333-.333.333-.333z"/>
      <path fill="currentColor" d="M9.682 4.318l2.121 2.121 2.122-2.121-2.122-2.121-2.121 2.121zm0 6.364l2.121 2.121 2.122-2.121-2.122-2.121-2.121 2.121zm-.666-.666l2.121-2.121-2.121-2.122-2.121 2.122 2.121 2.121zm0-5.032L6.895 7.105l2.121 2.122 2.121-2.122-2.121-2.121zm-1.638.497h-3v3h3v-3zm2.741 0v3h3v-3h-3zm0-2.8h3v-3h-3v3zm-2.741 2v-3h-3v3h3zm1.941 0v3h3v-3h-3zm0-2v-3h-3v3h3zm2.484-.484A7.5 7.5 0 007.963.144L6.793 6.03c.29.058.558.2.768.41l4.242-4.242zM7.963.144A7.5 7.5 0 003.63.571l2.296 5.543a1.5 1.5 0 01.867-.085L7.963.144zM3.63.571A7.5 7.5 0 00.264 3.333l4.989 3.334a1.5 1.5 0 01.673-.553L3.63.571zM.264 3.333A7.5 7.5 0 00-1 7.5h6a1.5 1.5 0 01.253-.833L.264 3.333zM-1 7.5a7.5 7.5 0 001.264 4.167l4.989-3.334A1.5 1.5 0 015 7.5h-6zm1.264 4.167a7.5 7.5 0 003.366 2.762l2.296-5.543a1.5 1.5 0 01-.673-.553L.264 11.667zm3.366 2.762a7.5 7.5 0 004.333.427L6.793 8.97a1.5 1.5 0 01-.867-.085L3.63 14.429zm4.333.427a7.5 7.5 0 003.84-2.053L7.561 8.561a1.5 1.5 0 01-.768.41l1.17 5.885zm3.84-6.295l-.666-.666-4.242 4.242.666.666 4.242-4.242zm-4.908-.666a.558.558 0 01-.286.152l1.17 5.885a6.557 6.557 0 003.358-1.795L6.895 7.895zm-.286.152a.558.558 0 01-.323-.031L3.99 13.559a6.557 6.557 0 003.79.373L6.608 8.047zm-.323-.031a.558.558 0 01-.25-.206l-4.989 3.333A6.558 6.558 0 003.99 13.56l2.296-5.543zm-.25-.206a.558.558 0 01-.094-.31h-6c0 1.297.384 2.565 1.105 3.643L6.036 7.81zm-.094-.31c0-.11.033-.218.094-.31L1.047 3.856A6.558 6.558 0 00-.058 7.5h6zm.094-.31a.558.558 0 01.25-.206L3.99 1.441a6.558 6.558 0 00-2.943 2.415L6.036 7.19zm.25-.206a.558.558 0 01.323-.031l1.17-5.885a6.558 6.558 0 00-3.789.373l2.296 5.543zm.323-.031a.558.558 0 01.286.152l4.242-4.242A6.558 6.558 0 007.78 1.068L6.61 6.953zm4.528.152l.333-.333L7.228 2.53l-.333.333 4.242 4.242zm.333-.333l.333-.333-4.242-4.242-.333.333 4.242 4.242zM7.378 8.481h2.741v-6H7.378v6zm5.741-3v-2.8h-6v2.8h6zm-2.741 0v-.8h-6v.8h6zm-3 2.2h1.941v-6H7.378v6zm4.941-3v-2h-6v2h6zm-3 1h.8v-6h-.8v6z" mask="url(#a)"/>
    </svg>
  );
}