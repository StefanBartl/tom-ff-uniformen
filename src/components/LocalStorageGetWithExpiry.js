export default function LocalStorageGetWithExpiry(key) {
	const itemStr = localStorage.getItem(key);
	// if the item doesn't exist, return false
	if (!itemStr) {
		return false
	};
	
    const item = JSON.parse(itemStr);
	const now = new Date();
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		localStorage.removeItem(key);
        // Reload page
        window.location.reload(); 
        // and return null
		return null;
	};

	return true; // if value should returned => item.value
};