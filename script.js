// fdc7cae1
{/* <a href=""
        ><div class="item">
          <div class="movie-poster">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg"
              alt="N/A"
              srcset=""
            />
          </div>
          <div class="title">
            <p>Iron Man</p>
          </div>
          <div class="type-year">
            <p>2008 || movie</p>
          </div>
          <div class="num">1</div>
        </div></a
      > */}

let loader = document.getElementById("loader");
let btn = document.getElementById("btn");
let mainContainer = document.getElementsByClassName("container")[0];
function showDetailsInUI(arr)
{
 
 arr.forEach((val ,index)=>{
    let item = document.createElement("div");
     item.innerHTML = `<a href="https://www.imdb.com/title/${val.imdbID}/"
     ><div class="item">
       <div class="movie-poster">
         <img
           src="${val.Poster}"
           alt="N/A"
           srcset=""
         />
       </div>
       <div class="title">
         <p>${val.Title}</p>
       </div>
       <div class="type-year">
         <p>${val.Year} || ${val.Type}</p>
       </div>
       <div class="num">${index+1}</div>
     </div></a
   >`
   mainContainer.appendChild(item);
 })
}


async function fetchDetails(apikey , searcValue) {
   let url = `https://www.omdbapi.com/?s=${searcValue}&apikey=${apikey}`;
   await fetch(url , {method:"GET"}).then(async (data)=>{
      await data.json().then((data)=>{
        console.log(data);
        loader.style.display = "none";
        showDetailsInUI(data.Search);
      }).catch(()=>{
        alert("Enter a valid API key / Movie name");
      })
   })
}

function extractData(e){
  let apikey = document.getElementById("api").value;

  let search = document.getElementById("search").value;
  if(search === "" || apikey === "")
  {
    return;
  }
  document.getElementById("search").value = "";
  search = search.trim();
  mainContainer.innerHTML = "";
  loader.style.display = "block";
 fetchDetails(apikey,search);

}

btn.addEventListener("click",extractData);