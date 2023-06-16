const SERVER_URL = process.env.SERVER_URL || "http://localhost:8000"

const joinMeeting = async (id) => {
    const res = await fetch(`${SERVER_URL}/meetings/${id}/participants`, {
        method: "POST",
        body: JSON.stringify({ name: "new user", preset_name: "group_call_host", meeting_id: id }),
        headers: { "Content-Type": "application/json" }
    })
    const resJson = await res.json()
    const data = JSON.parse(resJson.detail)
    return data.data.token;
}

const getCandidateStatus = async () => {
    const response = await fetch(`${SERVER_URL}/multiple_faces_list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            meeting_id: window.location.pathname.split('/')[2],
            admin_id: window.localStorage.getItem("adminId") || "undefined"
        })
    });
    const res = await response.json()
    if(res.details) return undefined
    return res
}

export {
    joinMeeting,
    getCandidateStatus
}