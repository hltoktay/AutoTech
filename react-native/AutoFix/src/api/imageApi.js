
export function uploadFood(food, onFoodUploaded, {updating}){

    if(food.imageUri) {
        const fileExtension = food.imageUri.split('.').pop();
        console.log(fileExtension)
    }
}