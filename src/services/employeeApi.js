const API='https://jsonplaceholder.typicode.com/users';
const departments=['Engineering','Design','Marketing','People','Finance'];
const titles=['Software Engineer','Product Designer','Marketing Associate','People Coordinator','Financial Analyst'];
const salaries=[78000,68500,54000,62000,71500,82000,59000,66000];
async function request(url,options={}){const response=await fetch(url,options);if(!response.ok)throw new Error(`API request failed (${response.status}).`);return response.json()}
export async function fetchEmployees(signal){const users=await request(API,{signal});return users.slice(0,8).map((user,index)=>({id:user.id,apiId:user.id,name:user.name,email:user.email,department:departments[index%departments.length],title:titles[index%titles.length],salary:salaries[index],source:'API'}))}
export async function createEmployee(values){const saved=await request(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});return {...values,id:Date.now(),apiId:saved.id,source:'LOCAL'}}
export async function updateEmployee(employee,values){await request(`${API}/${employee.apiId??employee.id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,id:employee.apiId??employee.id})});return {...employee,...values,source:'LOCAL'}}
export async function deleteEmployee(employee){await request(`${API}/${employee.apiId??employee.id}`,{method:'DELETE'});return true}
