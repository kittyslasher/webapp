var dir = require('node-dir');
const fs = require('fs');

console.log('Rename folder and build json of BD !! LAZY BOY .. . . .');
console.log('DIR ' , __dirname );


let folder = __dirname +  '/shadow_icons';
let new_folder_shadow =  __dirname +  '/moved_shadow_icons';
let new_folder_colored =  __dirname +  '/moved_colored_icons';
let coloredFolder = __dirname +  '/colored_icons';

let bd_list = [];

function readShadowImages()
{
      
      // move file format from 1.name.jpg to 1_name.jpg
    let files = fs.readdirSync(folder);
      files.forEach(file => {

        //find id
        let id = file.slice(0, file.indexOf('.'));
        //replace first (.) for _ 
        
        var arr = [...file];
        arr[file.indexOf('.')] = "_";
        let new_file_name = arr.join("");
        let name = new_file_name.slice( new_file_name.indexOf('_') + 1 , new_file_name.indexOf('.')); 
        name = name[0].toLocaleUpperCase() + name.slice(1);

        console.log('Name ', name)
        if(name.includes('DS_Sto')){
          return;
        }


        bd_list.push({
          id : parseInt( id),
          name : name,
          img :  '_nuxt/assets/img/moved_shadow_icons/' + new_file_name  ,
          img_shahow : new_file_name,
          amount : 0,
          img_colored : '<empty>'
        });

        // console.log('[file]  ',  file);
        // console.log('[id]   ',   id  );
        // console.log('[name]   ',   name  );
        // console.log('[new_file_name]   ',   new_file_name  );

        //move folder path
        var oldPath = folder + '/' + file;
        var newPath = new_folder_shadow + '/' + new_file_name;
        console.log('Old Path ', oldPath, ' new Path ', newPath );
        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err
           console.log('Successfully renamed - AKA moved!')
        })

      });
      
      // storeData(bd_list , (__dirname + '/poke_data.json'  ))
    console.log('End of readshadow ... ')

}

function setPropertyInArray(pokes_array, criteria_id, field, val )
{
  pokes_array.forEach(elem => 
  {
    //  console.log("_elem id ", elem.id);
    if(elem.id == criteria_id)
    {
      elem[field] = val;
    }

  });
}


function readColoredImage()
{

  let files = fs.readdirSync(coloredFolder);
  files.forEach(file => {

    let id = file.slice(0, file.indexOf('.'));
    //replace first (.) for _ 
    
    var arr = [...file];
    arr[file.indexOf('.')] = "_";
    let new_file_name = arr.join("");
    let name = new_file_name.slice( new_file_name.indexOf('_') + 1 , new_file_name.indexOf('.'));

    setPropertyInArray(bd_list, id, 'img_colored' , new_file_name );

    //move to new folder colored
        var oldPath = coloredFolder + '/' + file;
        var newPath = new_folder_colored + '/' + new_file_name;
        console.log('Old Path ', oldPath, ' new Path ', newPath );
        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err
           console.log('Successfully renamed - AKA moved!')
    })


  })


}



function run()
{

  //read shadow images | fix names and add shadow icons
  readShadowImages();


  //order the array by id
  // let order = bd_list.sort(function(a, b) {
  //   return a.id - b.id;
  // });

  // console.log(' Sorted ', order );

  //read colored images | fix names and add colored names
  readColoredImage();

  //read colored images and store colored name
  let order = bd_list.sort(function(a, b) {
    return a.id - b.id;
  });


  const storeData = (data, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }

  storeData( order, './poke-db.json',);
  console.log(' Final array ', order );


}


run();


