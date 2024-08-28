import React from 'react'
import {Container, Paper,Typography} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
const Table = ({heading,rows,columns,rowHeight}) => {
  return (
    <Container 
    sx={{
     height:"100vh"
    }}
    >
      <Paper
      elevation={3}
      sx={{
        padding:"1rem 4rem",
        borderRadius:"1rem",
        margin:"auto",
        width:"100%",
        height:"100%",
        overflow:"hidden",
        boxShadow:"none"

      }}>
        <Typography>{heading}</Typography>
        <DataGrid 
        rows={rows} 
        columns={columns}
        rowHeight={rowHeight}
        style={{
          height:"80%"
        }}
        sx={{
          border:"none",
          ".table-header":{
            bgcolor:"black",
            color:"white"
          }
        }}
        />


      </Paper>

    </Container>
  )
}

export default Table