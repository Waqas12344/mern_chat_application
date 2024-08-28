import React, { useState } from 'react'
import {Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography} from '@mui/material'
import {CameraAlt as CameraAltIcon} from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents'
import {useFileHandler, useInputValidation, useStrongPassword} from '6pp'
import { usernameValidator } from '../utils/validators'
const Login = () => {

    const [isLogin,setIslogin]=useState(true);

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("",usernameValidator);
    const password = useStrongPassword();

    const avatar =useFileHandler('single')
    const handleLogin =(e)=>{
        e.preventDefault();
    }
    const handleSignUp=(e)=>{
e.preventDefault();
    }

  return <Container component={'main'} maxWidth='xs' 
  sx={{
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }}>
    <Paper elevation={3} sx={{
        padding:4,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }} >

{
    isLogin ? <>
    <Typography variant='h5'>
        Login
    </Typography>
    <form style={{
        width:'100%',
        marginTop:'1rem'
    }}
    onSubmit={handleLogin}
    >
        <TextField value={name.value} onChange={name.changeHandler} required fullWidth label='Username' margin='normal'  />
        <TextField value={password.value} onChange={password.changeHandler} required fullWidth label='Password' margin='normal' type='password' />
        <Button sx={{
            marginTop:'1rem'
        }} fullWidth variant='contained' color='primary' type='submit'>
            Login
        </Button>
        <Typography textAlign={'center'} m={'1rem'}>
            OR
        </Typography>
        <Button
        fullWidth
        variant='text' onClick={()=>setIslogin(false)}>
            Sign Up instead
        </Button>
    </form>

    </> : <>
    <Typography variant='h5'>
        Sign Up
    </Typography>
    <form style={{
        width:'100%',
        marginTop:'1rem'
    }}
    onSubmit={handleSignUp}
    >
        <Stack position={'relative'} width={'10rem'} margin={'auto'}>
<Avatar sx={{
    width:'10rem',
    height:'10rem',
    objectFit:'contain'
}} 
src={avatar.preview} />
 
<IconButton  sx={{
    position:'absolute',
    bottom:'0',
    right:'0',
    color:"white",
    bgcolor:"rgba(0,0,0,0.5)",
    ":hover":{
        bgcolor:'rgba(0,0,0,0.7)'
    },
}}
    component="label"
>
    <>
    <CameraAltIcon/>
    <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
    </> 
</IconButton>
        </Stack>
        {
    avatar.error && (
        <Typography m={'1rem auto'} width={'fit-content'} display={'block'} color="error" variant='caption'>{avatar.error}</Typography>
    )
}
        <TextField value={name.value} onChange={name.changeHandler} required fullWidth label='Name' margin='normal'  />
        <TextField value={username.value} onChange={username.changeHandler} required fullWidth label='Username' margin='normal'  />
{
    username.error && (
        <Typography color="error" variant='caption'>{username.error}</Typography>
    )
}

        <TextField value={password.value} onChange={password.changeHandler} required fullWidth label='Password' margin='normal' type='password' />
        {
    password.error && (
        <Typography color="error" variant='caption'>{password.error}</Typography>
    )
}
        <TextField value={bio.value} onChange={bio.changeHandler}  required fullWidth label='Bio' margin='normal' variant='outlined' />
        <Button sx={{
            marginTop:'1rem'
        }} fullWidth variant='contained' color='primary' type='submit'>
            Sign Up
        </Button>
        <Typography textAlign={'center'} m={'1rem'}>
            OR
        </Typography>
        <Button
        fullWidth
        variant='text' onClick={()=>setIslogin(true)}>
            Already have account
        </Button>
    </form>

    </>
}
    </Paper>
  </Container>
}

export default Login