using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Data;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Application.FileUpload
{
    public class AddPhoto
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photoUploadResult = request.File;

                if (photoUploadResult.Length > 0)
                {
                    if (photoUploadResult.Length > 2097152)
                            return Result<Photo>.Failure("Maksymalna wielkość pliku to 2MB");
                            
                    Photo photoStream = new Photo();

                    using (var memoryStream = new MemoryStream())
                     {
                        
                        await photoUploadResult.CopyToAsync(memoryStream);
                        photoStream.Content = memoryStream.ToArray();
                    }
                    _context.Photos.Add(photoStream);
                    user.Photo = photoStream;
                    var result = await _context.SaveChangesAsync() > 0;
                    if (result) return Result<Photo>.Success(photoStream);


                }
                return Result<Photo>.Failure("Błąd dodania zdjęcia");


            }
        }
    }
}