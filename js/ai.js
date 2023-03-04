const loadData = async(limit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, limit);
}
const displayData = (aiItems, limit) =>{

    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

   // display only 6 card 
   const showAll = document.getElementById('show-more');
   if (limit && aiItems.length > 6) {
       aiItems = aiItems.slice(0, 6);
       showAll.classList.remove('d-none');
   }
   else {
    showAll.classList.add('d-none');
   }

     // short by date
  document.getElementById('short-by-date').addEventListener('click', function(){
    mainContainer.innerHTML = '';
    // Custom comparison function to sort by date
    function compareEvents(a, b) {
      const dateA = new Date(a.published_in);
      const dateB = new Date(b.published_in);
      return dateB - dateA;
    }
    
    // Sort the array by date
    aiItems.sort(compareEvents);
    
    // Print the sorted array
    aiItems.forEach(aiItem => {
      const aiItemDiv = document.createElement('div');
      aiItemDiv.classList.add('col');
      aiItemDiv.innerHTML = `
      <div class="card h-100 rounded">
      <img src="${aiItem.image}" class="card-img-top p-3" alt="...">
      <div class="card-body">
        <h4 class="card-title fw-bolder ps-3">Features</h4>
        <ol>
           <li>${aiItem.features[0]}</li>
           <li>${aiItem.features[1]}</li>
           <li>${aiItem.features[2]}</li>
        </ol>
        <hr>
        <div class="d-flex align-items-center justify-content-between">
        <div>
           <h4 class="card-title fw-bolder ps-3 pb-2">${aiItem.name}</h4>
           <h6 class="ps-3"><i class="bi bi-calendar3 pe-2"></i>${aiItem.published_in}</h6>
       </div>
        <div>
           <button onclick="loadAiDetails('${aiItem.id}')" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#detailsModal">
           <i class="bi bi-arrow-right-circle fs-2 text-danger"></i>
           </button>
       </div>
       </div>
      </div>
    </div>
      `;
      mainContainer.appendChild(aiItemDiv);
   })
    
    })

    aiItems.forEach(aiItem => {
       const aiItemDiv = document.createElement('div');
       aiItemDiv.classList.add('col');
       aiItemDiv.innerHTML = `
       <div class="card h-100 rounded">
       <img src="${aiItem.image}" class="card-img-top p-3" alt="...">
       <div class="card-body">
         <h4 class="card-title fw-bolder ps-3">Features</h4>
         <ol>
            <li>${aiItem.features[0]}</li>
            <li>${aiItem.features[1]}</li>
            <li>${aiItem.features[2]}</li>
         </ol>
         <hr>
         <div class="d-flex align-items-center justify-content-between">
         <div>
            <h4 class="card-title fw-bolder ps-3 pb-2">${aiItem.name}</h4>
            <h6 class="ps-3"><i class="bi bi-calendar3 pe-2"></i>${aiItem.published_in}</h6>
        </div>
         <div>
            <button onclick="loadAiDetails('${aiItem.id}')" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#detailsModal">
            <i class="bi bi-arrow-right-circle fs-2 text-danger"></i>
            </button>
        </div>
        </div>
       </div>
     </div>
       `;
       mainContainer.appendChild(aiItemDiv);
    })
    // stop loader
    toggleSpinner(false);
}
const loadAiDetails = async(id) =>{
  try {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayLoadAiDetails(data.data);
  } catch (error) {
    console.log('An error occurred:', error);
  }
   
}
const displayLoadAiDetails = aiDetails =>{
    console.log(aiDetails);
    const modalBodyCol1 = document.getElementById('card-body1');
    modalBodyCol1.innerHTML = `
      <h5 class="fw-bolder w-75">${aiDetails.description ? aiDetails.description : "No Description"}</h5>
      <br>
      <div class="d-flex gap-2 align-items-center justify-content-between modal-container">
      <div class="border-2 text-center py-3 px-2 bg-white rounded modal-container-sm">
        <h6 class="fw-bolder text-success ">${aiDetails.pricing && aiDetails.pricing[0].price !== '0' && aiDetails.pricing[0].price !== 'No cost'  ? aiDetails.pricing[0].price : "Free of Cost"}</h6>
        <h6 class="fw-bolder text-success">${aiDetails.pricing  && aiDetails.pricing[0].price !== '0' && aiDetails.pricing[0].price !== 'No cost' ? aiDetails.pricing[0].plan : "Basic"}</h6>
      </div>
      <div class="border-2 text-center px-2 py-3 bg-white rounded modal-container-sm">
      <h6 class="fw-bolder text-danger">${aiDetails.pricing && aiDetails.pricing[1].price !== '0' && aiDetails.pricing[1].price !== 'No cost' ? aiDetails.pricing[1].price : "Free of Cost"}</h6>
      <h6 class="fw-bolder text-danger">${aiDetails.pricing && aiDetails.pricing[1].price !== '0' && aiDetails.pricing[1].price !== 'No cost' ? aiDetails.pricing[1].plan : "Pro"}</h6>
       </div>
      <div class="border-2 text-center py-3 px-2 bg-white rounded modal-container3">
      <h6 class="fw-bolder text-warning">${aiDetails.pricing ? aiDetails.pricing[2].price : "Free of Cost"}</h6>
      <h6 class="fw-bolder text-warning">${aiDetails.pricing ? aiDetails.pricing[2].plan : "Enterprise"}</h6>
      </div>
      </div>
      <br>
      <div class="d-flex gap-5 justify-content-center mt-2">
        <div>
         <h5 class="fw-bolder">Features</h5>
            <ul class="fw-bold text-muted list-class">
                <li>${aiDetails.features['1'] ? aiDetails.features['1'].feature_name : "No data Found"}</li>
                <li>${aiDetails.features['2'] ? aiDetails.features['2'].feature_name : "No data Found"}</li>
                <li>${aiDetails.features['3'] ? aiDetails.features['3'].feature_name : "No data Found"}</li>
            </ul>
        </div>
        <div>
        <h5 class="fw-bolder">Integrations</h5>
            <ul class="fw-bold text-muted list-class">
                <li>${aiDetails.integrations && aiDetails.integrations[0] ? aiDetails.integrations[0] : "No data Found"}</li>
                <li>${aiDetails.integrations && aiDetails.integrations[1] ? aiDetails.integrations[1] : "No data Found"}</li>
                <li>${aiDetails.integrations && aiDetails.integrations[2] ? aiDetails.integrations[2] : "No data Found"}</li>
            </ul2
        </div2
    </div>
    `;
    const modalBodyCol2 = document.getElementById('card-body2');
    modalBodyCol2.innerHTML = `
    <div>
      <div class="position-relative">
      <img src="${aiDetails.image_link[0]}" class="card-img-top p-3" alt="...">
      <div class="position-absolute top-0 end-0 px-2  mt-5 me-4 translate-middle-y text-white fw-bolder bg-danger rounded">
       <span>${(aiDetails.accuracy.score*100)}% accuracy</span>
       </div>
         <div class="text-center mt-3">
         <h4>${aiDetails.input_output_examples ? aiDetails.input_output_examples[0].input : "Can you give any example?"}</h4>
         <p class="w-75 mx-auto text-muted pb-3">${aiDetails.input_output_examples ? aiDetails.input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
         </div>
    </div>    
    `;

    
}
document.getElementById('show-all-btn').addEventListener('click', function (){
   loadData();
  //  start loader
   toggleSpinner(true);
})

// loader spinner
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
      loaderSection.classList.remove('d-none');
  } else {
      loaderSection.classList.add('d-none');
  }
}
loadData(6);
  //  start loader
toggleSpinner(true);