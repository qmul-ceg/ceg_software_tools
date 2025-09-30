import React from 'react'

const FooterSection = () => {
   return (
      <div className=" flex gap-2  mx-4 mb-2 justify-between items-center  lg:text-xs xl:text-sm border ">
            <div className="flex mx-auto ">
               <p className="font-semibold">© Clinical Effectiveness Group (CEG), Queen Mary University of London. All rights reserved. </p> 
               <div className="w-[4em] ml-2">
                  {/* <img 
                     alt="Creative Commons NC SA logo"
                     src='/icons/nc_sa_logo.png'
                  /> */}
               </div>
            </div>
             <div >
               v.0.1.0
            </div>
      </div>
   )
}

export default FooterSection
