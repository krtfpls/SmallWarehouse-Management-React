// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Http;
// using Model;
// using SixLabors.ImageSharp;
// using SixLabors.ImageSharp.Processing;

// namespace Infrastructure.Photos
// {
//     public class PhotoAccessor
//     {
//         const int size =500;
//         const int quality = 75;

//         public async Task<Image> AddPhoto(byte[] file){
             
//             using (Image image = Image.Load(file)){
//                 image.Mutate(x => x.Resize(size, size));
                
//                  image.Save(fileOut, new IFormFile() );
//             }

          
//         }
//     }
// }