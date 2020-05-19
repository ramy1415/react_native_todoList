import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native'
import FontAwesome from 'expo-vector-icons/FontAwesome'
export default function App() {
  const [TodoList, setTodoList] = React.useState([])
  const [current, setcurrent] = React.useState([])
  const [newItem, setnewItem] = React.useState({id:0,isdone:"",value:""})
  const [show,setShow]=React.useState("active")

  React.useEffect(()=>{
    if(show == "active"){
      const Mylist=TodoList.filter((e)=>{
        return e.isdone == false
      })
      setcurrent(Mylist)
    }
    if(show == "done"){
      const Mylist=TodoList.filter((e)=>{
        return e.isdone == true
      })
      setcurrent(Mylist)
    }
    if(show == "all"){
      setcurrent(TodoList)
    }
  },[show,TodoList])

  return (
    <View style={styles.container}>
      <View style={{flexGrow:.2}}></View>
      <View style={{flexGrow:1,width:300}}>


      <View style={styles.header}>
          <Text style={styles.title}>BABY SHARK</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={{color:"#fff" , fontWeight:'bold'}} >TODO</Text>
            <Text style={{color:"#fff" }} >-dododoooodododo</Text>
          </View>
          <TextInput style={{width:240 , backgroundColor:'#fff' }} onChangeText={(text)=>setnewItem({id:TodoList.length,isdone:false,value:text})}
          value={newItem.value}
          />
          <TouchableOpacity 
          style={{backgroundColor:'#FF6438' , paddingHorizontal:5 , borderRadius:50}}
          onPress={()=>{
            if(newItem){
              setTodoList([...TodoList,newItem])
              setnewItem({})
            }
          }}
          >
            <FontAwesome name='plus' size={32} color='#11031D' />
          </TouchableOpacity>
          <View style={{flexDirection:'row' , justifyContent:'space-around'}}>
            <TouchableOpacity style={{backgroundColor:'#fff' , paddingHorizontal:15,paddingVertical:5 , borderRadius:50}}
            onPress={()=>{
              setShow('all')
            }}>
              <Text style={{ fontSize:15}}>ALL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#fff' , paddingHorizontal:15,paddingVertical:5 , borderRadius:50}}
              onPress={()=>{
              setShow('active')
              }}
            >
              <Text style={{ fontSize:15}}>ACTIVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#fff' , paddingHorizontal:15,paddingVertical:5 , borderRadius:50}}
            onPress={()=>{
              setShow('done')
            }}
              >
              <Text style={{ fontSize:15}}>DONE</Text>
            </TouchableOpacity>
          </View>
      </View>

        <FlatList
        data={current}
        renderItem={({ item, index }) => (

            <TouchableOpacity key={index} style={{flexDirection:"row"}}
            onPress={(event)=>{
              let newList = TodoList.map(todo=>{
                if (todo.id == item.id){
                  todo.isdone = !todo.isdone
                  return todo
                }
                return todo
              })
              setTodoList(newList)
            }}
            >
              <FontAwesome name={ item.isdone ? 'check-square-o' : 'square-o'} size={32} color={ item.isdone ? '#FF6438' : "#fff"} />
              <Text style={{color: item.isdone ? '#FF6438' : "#fff" , marginLeft:10 , fontSize:20}} >{item.value}</Text>
            </TouchableOpacity>
        )}
        />
        
        


      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11031D',alignItems:'center'
  },header:{
    flexWrap:'wrap' , flexDirection:'row' , justifyContent:'space-evenly'
  },title:{
    color:'#FF6438',fontSize:30,fontWeight:'bold'
  }
})


