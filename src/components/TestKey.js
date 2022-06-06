export default function TestKey(key) {
	
	const itemStr = localStorage.getItem(key);
	// if the item doesn't exist, return false
	if (!itemStr) {
		return false
	};

	const item = JSON.parse(itemStr);
	if(Object.values(item)[0] === process.env.REACT_APP_USER_KEY) return true; // if value should returned => item.value

};