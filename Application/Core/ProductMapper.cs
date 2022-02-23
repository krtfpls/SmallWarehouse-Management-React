using System;
using Application.Products;
using Model;

namespace Application.Core
{
    public class ProductMapper
    {

        public static Product MapFromDto (Product Product,
                         ProductDTO ProductDto, User user, CategoryItem category, int quantity)
    {       
        Product _tempProduct = new Product(){
            Id = Product.Id == Guid.Empty
                ? (ProductDto.Id == Guid.Empty ? Product.Id= Guid.NewGuid() : Product.Id = ProductDto.Id)
                : Product.Id= Product.Id,
            Name= ProductDto.Name ?? Product.Name,
            SerialNumber= ProductDto.SerialNumber ?? Product.SerialNumber,
            PriceNetto= ProductDto.PriceNetto != 0 ? ProductDto.PriceNetto : Product.PriceNetto,
            MinLimit= ProductDto.MinLimit!=0 ? ProductDto.MinLimit : Product.MinLimit,
            Description= ProductDto.Description ?? Product.Description,
            Category= category ?? Product.Category,
            User= user,
    };
            _tempProduct.AddItem(quantity);

        return _tempProduct;
            
        }

    }
}