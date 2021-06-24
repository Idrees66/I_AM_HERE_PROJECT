import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity } from 'react-native'
import DATA from "../data/wayfind.json";
import axios from "axios";

const LocationList = ({navigation}) => {

    const [data, setdata] = useState(DATA)
    const [filteredData, setfilteredData] = useState(null)
    const [ARList, setARList] = useState([
        {
            id:140,
            ARurl: "https://imh140.glitch.me"
        },
        {
            id:141,
            ARurl: "https://imh141.glitch.me"
        },
        {
            id:142,
            ARurl: "https://imh142.glitch.me"
        },
        {
            id:143,
            ARurl: "https://imh143.glitch.me"
        },
        {
            id:144,
            ARurl: "https://imh144.glitch.me"
        },
        {
            id:145,
            ARurl: "https://imh145.glitch.me"
        },
        {
            id:146,
            ARurl: "https://imh146.glitch.me"
        },
        {
            id:147,
            ARurl: "https://imh147.glitch.me"
        },
        {
            id:148,
            ARurl: "https://imh148.glitch.me"
        },
        {
            id:149,
            ARurl: "https://imh149.glitch.me"
        },
        {
            id:150,
            ARurl: "https://imh150.glitch.me"
        },
    ])


    useEffect(() => {
        FetchAPI()
        // fetchData()
    }, [])

    function FetchAPI(){
        axios.get('https://api.gamifi.co/route/getWaypoints', {
            headers: {
                'g-app': '16b5c1aa-b696-11e8-ac1f-0eb20392d614'
                }
         })
        .then(response => {
            // console.log('Response', response.data)
            const dataArray = []
            const temp = response.data.body.waypoints
            temp.map((item,index)=>{
                const newObj = {
                    id : item.id,
                    name: item.name,
                    tag: item.tag,
                    // description: item.description,
                    // extensions:item.extensions,
                    ARurl: ARList[index].ARurl,
                    thumbnail: item.asset.attachments.thumbnails[2].url
                }
                dataArray.push(newObj)
            })
            setfilteredData(dataArray)
        })
        .catch(e => {
            console.log('Error: ', e.response.data)
        })
    }




    function fetchData(){
        const dataArray = []
        const temp = data.body.waypoints
        temp.map((item,index)=>{
            const newObj = {
                id : item.id,
                name: item.name,
                tag: item.tag,
                // description: item.description,
                // extensions:item.extensions,
                ARurl: ARList[index].ARurl,
                thumbnail: item.asset.attachments.thumbnails[2].url
            }
            dataArray.push(newObj)
        })
        setfilteredData(dataArray)
    }



    function renderPlaces(item,index){
        return(
            <View 
            // onPress={()=>navigation.navigate("FurnitureDetail",{furniture:item})}
            style={[styles.furn,{backgroundColor:"white",width:"100%",height:150,marginBottom:15,borderRadius:15,elevation:2,justifyContent: 'space-between',padding:10,flexDirection:"row"}]}>
                {/* {console.log("Item",item)} */}
                 <View
                 style={[styles.furn2,{elevation:1,borderRadius:25,width:"45%",height:"100%",justifyContent: 'center', alignItems: 'center',backgroundColor: "white",}]}>
                <Image source={{uri: item.thumbnail}} style={{width:"70%",height:"70%"}} resizeMode="contain" />
                </View>
                <View style={{width:"55%",padding:10,justifyContent: "space-between",}}>
                    <View>
                    <Text style={{color:"rgb(0,94,174)",fontSize:18,fontWeight:'bold'}}>{item.name}</Text>
                    
                    </View>
         
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems: 'center',}}>
                    <TouchableOpacity  
                     onPress={()=>navigation.navigate("AR_View",{ARurl: item.ARurl})}
                    // onPress={()=>navigation.navigate("ARWeb",{item: item.modelURL})}
                    style={{backgroundColor:"rgb(0,94,174)",padding:5,borderRadius:10,paddingHorizontal: 10,}} >
                        <Text style={{color: "white"}}>Open AR</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    if (!filteredData) {
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require("../assets/loading4.gif")} style={{ width: 70, height: 70 }} resizeMode="contain" />
        </View>
    }

    return (
        <View style={styles.back}>
            {console.log("\n \n \n--------------Inside return----------------\n")}
            {/* {console.log("Json Object: ",filteredData)} */}
           
            <View style={{marginTop:0,height:"100%",padding: 20,}}>
                <FlatList
                    horizontal={false}
                   showsVerticalScrollIndicator={false}
                    keyExtractor={(item)=>item.id.toString()}
                    data={filteredData}
                    renderItem={({item,index})=>renderPlaces(item,index)}
                    
                />
            </View>
        </View>
    )
}

export default LocationList

const styles = StyleSheet.create({
    back:{
        flex:1,
        marginTop:40,
       backgroundColor:"#EEEEEE"
    },
})
