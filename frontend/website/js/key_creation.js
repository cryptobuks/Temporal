function createKey()
{
	if(window.sessionStorage.token == undefined || window.sessionStorage.token == "")
	{
		window.alert("Not logged in");
	}
	else
	{
		var apiUrl = "https://nuts.rtradetechnologies.com:6767/api/v1/account/key/ipfs/new";
		var keyType = document.getElementById("keyType").value;
        var keyBits = document.getElementById("keyBits").value;
        var keyName = document.getElementById("keyName").value;

		//send api request
		var request = new XMLHttpRequest();
		request.open('POST', apiUrl, true);
		request.setRequestHeader("Cache-Control", "no-cache");
		request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token );
		
		var formData = new FormData();
		formData.append("key_type", keyType);
        formData.append("key_bits", keyBits);
        formData.append("key_name", keyName);

		request.onload = function ()
		{
			if(request.status < 400)
			{
				//pin was successful
				var data = JSON.parse(this.response);
				console.log(data);
				window.alert("key creation suceeded");
			}
			else
			{   
				console.log(this.response);
				window.alert("key creation failed");
			}
		}
		request.onerror = function ()
		{
			console.log(request.responseText);
		}
		request.send(formData);
	}
}