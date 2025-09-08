const iceServers = [
	{urls:"stun:stun.l.google.com:19302"}
];
const extractIP = (event) => {
	try{
		const sdp = event.target.localDescription.sdp;

	}catch{
		return {};
	}
};
export.getIpWithStunProtocol = (success) => {
	const pc = new RTCPeerConnection({
		iceServers:iceServers
	});
	pc.createDataChannel("");
	pc.onicecandidate = (event) => {
		if(!event.candidate)
			return;
	};
	pc.createOffer().then(o => pc.setLocalDescription(o));
};
