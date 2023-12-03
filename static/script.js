const request = new XMLHttpRequest();
request.open('GET', '/data', true);

request.onload = function () {
	const data = JSON.parse(this.response).data

	const table = document.getElementById("data-table")
	data.forEach((row, index) => {
		table.innerHTML += `
			<tr>
				<td>${index + 1}</td>
				<td>${row.companyName}</td>
				<td>${row.subscriber}</td>
				<td>${row.firstName}</td>
				<td>${row.lastName}</td>
				<td>${row.gender}</td>
				<td>${row.dateOfBirth}</td>
				<td>${row.placeOfBirth}</td>
				<td>${row.nationality}</td>
				<td>${row.occupation}</td>
				<td>${row.digitaladdress}</td>
				<td>${row.addr}</td>
				<td>${row.tin}</td>
				<td>${row.sign}</td>
			</tr>
		`
	})
}

request.send()