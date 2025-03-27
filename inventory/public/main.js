function deleteProduct(id){
    const consent = confirm(`Are you sure you want to delete?`);

    if(consent){
        fetch(`/delete-product/${id}`,{
            method:'POST'
        }).then((res)=>{
            if(res.ok){
                // window.location.href = "/";
                location.reload();
            }
        })
    }
}


