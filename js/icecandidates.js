const iceServers = [
	{urls:"stun:stun.l.google.com:19302"}
];
const extractIP = (event) => {
	try{
		const ipv4Regex = /(((2[0-5]\d)|(\d\d)|(\d))\.){3}((2[0-5]\d)|(\d\d)|(\d))/;
		const ipv6Regex = /((([0-9]|[a-f])){1,4}:){7}(([0-9]|[a-f]))/;
		const raw = event.candidate.candidate;
		const fields = raw.split(" ");
		const dataframeType = fields[2];
		if(dataframeType != "UDP")
			return;
		const result = {
			ip : fields[4],
			port : fields[5],
			type : ""
		};
		if(ipv4Regex.test(result.ip))
		{
			result.type = "ipv4";
			return result;
		}
		else if(ipv6Regex.test(result.ip))
		{
			result.type = "ipv6";
			return result;
		}
		return;

	}catch{
		return;
	}
};
export const getIPWithStunProtocol = (success) => {
	const pc = new RTCPeerConnection({
		iceServers:iceServers
	});
	pc.createDataChannel("");
	pc.onicecandidate = (event) => {
		if(!event.candidate)
			return;
		const ip = extractIP(event);
		if(ip)
			console.log(ip);
	};
	pc.createOffer().then(o => pc.setLocalDescription(o));
};
