import axios from "axios"


axios.defaults.baseURL = "http://192.168.2.18:3000/"

export async function getUserProfile(userId){

    try {

        const {data} = await axios.get(`/user/getUser/${userId}`)

        console.log(data);

        return data;

    } catch (error) {

        console.log(error);

    }
}

export async function updateUserProfile(userId,{fullName,profileImage}){

    try {

        const {data} = await axios.post(`/user/updateUser/${userId}`,{
            fullName,
            profileImage
        })

        return data;

    } catch (error) {

        console.log(error);

    }
}
