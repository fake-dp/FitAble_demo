import ScanTemplate from "../../components/templates/homScreens/ScanTemplate";
import axios from "axios";
import { useEffect , useState} from "react";
import { Text, View } from "react-native";

function HomeScan() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {
            setData(response.data);
            console.log('datar',response.data);
        })
    }, [])

    console.log('datadata',data)

    return (
        <>
        <View>
            <Text>{data.id}</Text>
            <Text>{data.title}</Text>
            <Text>{data.body}</Text>
        </View>
       <ScanTemplate />
        </>
    );
}

export default HomeScan;
