import { AppBar, Backdrop, Box, CircularProgress, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, useState } from 'react'
import { orange } from '../../constants/color'
import { Menu as MenuIcon, Add as AddIcon, Search as SearchIcon, Group as GroupIcon,Logout as LogoutIcon, Notifications as NotificationsIcon } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom'

const SearchDialog =lazy(()=>import("../specific/Search"))
const NotificationDialog =lazy(()=>import("../specific/Notifications"))
const NewGroupDialog =lazy(()=>import("../specific/NewGroup"))
const Header = () => {

    const [isMobile,setIsMobile]=useState(false)
    const [isSearch,setIsSearch]=useState(false)
    const [isNewGroup,setIsNewGroup]=useState(false)
    const [isNotification,setIsNotification]=useState(false)

    const navigate=useNavigate();
    const handleMobile = () => {
        setIsMobile(prev=>!prev);  
    }
    const openNewGroup = () => {
        setIsNewGroup(prev=>!prev)
    }
    const openSearchDialog =()=>{
        setIsSearch(prev=>!prev)
    }
    const openNotification =()=>{
        setIsNotification(prev=>!prev)
    }
    const navigateToGroup =()=>navigate("/groups")
     const logoutHandler =()=>{
        console.log("logout")
     }
    return <>

        <Box sx={{ flexGrow: 1 }} height={"4rem"}>
            <AppBar position='static' sx={{
                bgcolor: orange
            }} >
                <Toolbar
                >
                    <Typography variant='h6'
                        sx={{
                            display: {
                                xs: 'none', sm: "block"
                            },
                        }}>

                        ChatApp
                    </Typography>
                    <Box
                        sx={{
                            display: { xs: "block", sm: "none" }
                        }}>


                        <IconButton color='inherit' onClick={handleMobile}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        flexGrow: 1,
                    }} />
                    <Box 
                   >

                    <IconBtn title={"Search"} icon={<SearchIcon/>} onClick={openSearchDialog} />
                      
                    <IconBtn title={"New Group"} icon={<AddIcon/>} onClick={openNewGroup} />
                    <IconBtn title={"Manage Group"} icon={<GroupIcon/>} onClick={navigateToGroup} />
                       
                    <IconBtn title={"Logout"} icon={<LogoutIcon/>} onClick={logoutHandler} />
                    <IconBtn title={"Notification"} icon={<NotificationsIcon/>} onClick={openNotification} />
                    </Box>
                </Toolbar>

            </AppBar>
        </Box>
        {
            isSearch && (
                <Suspense fallback={<Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>}>
                    <SearchDialog />
                </Suspense>
            )
        }
         {
            isNotification && (
                <Suspense fallback={<Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>}>
                    <NotificationDialog />
                </Suspense>
            )
        }
         {
            isNewGroup && (
                <Suspense fallback={<Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>}>
                    <NewGroupDialog />
                </Suspense>
            )
        }
        </>
}

const IconBtn=({title,icon,onClick})=>{
return (
    <Tooltip title={title} >
        <IconButton color='inherit' size='large' onClick={onClick}>
            {icon}
        </IconButton>
    </Tooltip>
)
}

export default Header