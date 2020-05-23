import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native'
import FontAwesome from 'expo-vector-icons/FontAwesome'
export default function App() {
  const [TodoList, setTodoList] = React.useState([])
  const [current, setcurrent] = React.useState([])
  const [myIndex,setMyindex]= React.useState(0)
  const [newItem, setnewItem] = React.useState(false)
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
      <View >
        <View style={{height:100}}>

        </View>
        <View style={{height:150,width:300 , marginBottom:20 ,justifyContent:'space-between'}}>
            <View>
              <Text style={styles.title}>BABY SHARK</Text>
            </View>
            <View style={{flexDirection:'row' , justifyContent:'center'}}>
              <Text style={{color:"#fff" , fontWeight:'bold'}} >TODO</Text>
              <Text style={{color:"#fff" }} >-dododoooodododo</Text>
            </View>
            <View style={{flexDirection:"row" , justifyContent:'space-evenly'}}>
              <TextInput style={{width:200 , backgroundColor:'#fff' }} onChangeText={(text)=>setnewItem({id:myIndex,isdone:false,value:text})}
              value={newItem.value}
              />
              <TouchableOpacity 
              style={{backgroundColor:'#FF6438' , paddingHorizontal:5 , borderRadius:50}}
              onPress={()=>{
                if(newItem){
                  setTodoList([...TodoList,newItem])
                  setnewItem(false)
                  setMyindex(myIndex+1);
                  setShow('active')
                }
              }}
              >
                <FontAwesome name='plus' size={32} color='#11031D' />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row' , justifyContent:'space-evenly'}}>
              <TouchableOpacity style={{backgroundColor:(show == 'all') ? '#FF6438' : "#fff" , paddingHorizontal:15,paddingVertical:5 , borderRadius:50 }} 
              onPress={()=>{
                setShow('all')
              }}>
                <Text style={{ fontSize:15}}>ALL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:(show == 'active') ? '#FF6438' : "#fff" , paddingHorizontal:15,paddingVertical:5 , borderRadius:50 }}
                onPress={()=>{
                  setShow('active')
                }}
                >
                <Text style={{ fontSize:15}}>ACTIVE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:(show == 'done') ? '#FF6438' : "#fff" , paddingHorizontal:15,paddingVertical:5 , borderRadius:50} }
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
              keyExtractor={(item, index) => item.id.toString() + item.value}
              renderItem={({ item, index }) => (
                <View style={{flexDirection:"row",justifyContent:'space-between' , marginVertical:5 ,borderBottomWidth:1,borderColor:'white' , padding:3}}>

                  <TouchableOpacity  style={{flexDirection:"row"}}
                  onPress={(event)=>{
                    let newList = TodoList.map(todo=>{
                      if (todo.id == item.id){
                        todo.isdone = !todo.isdone
                      }
                      return todo
                    })
                    setTodoList(newList)
                  }}
                  >
                    <FontAwesome name={ item.isdone ? 'check-square-o' : 'square-o'} size={32} color={ item.isdone ? '#FF6438' : "#fff"} />
                    <Text style={{flexBasis:200,color: item.isdone ? '#FF6438' : "#fff" , marginLeft:10 , fontSize:20}} >{item.value}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{alignSelf:'flex-end'}}>
                    <FontAwesome name='trash' size={32} color='red' onPress={(event)=>{
                      console.log(item)
                      let newList = TodoList.filter((e)=>{
                        return e.id != item.id
                      })
                      setTodoList(newList)
                    }} />
                  </TouchableOpacity>
                </View>
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
  }
  ,title:{
    color:'#FF6438',fontSize:30,fontWeight:'bold',alignSelf:'center'
  }
})


