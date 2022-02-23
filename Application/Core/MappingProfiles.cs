using System.Linq;
using Application.Contractors;
using Application.Documents;
using Application.Products;
using AutoMapper;
using Model;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, Product>(); 
            CreateMap<Contractor, Contractor>();
            CreateMap<CategoryItem, CategoryItem>();
            CreateMap<Document, Document>();
            CreateMap<Document, DocumentsDto>()
                .ForMember(d => d.Contractor, o => o.MapFrom(s => s.Contractor))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Date))
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.Number, o => o.MapFrom(s => s.Number))
                .ForMember(d => d.Products, o => o.MapFrom(s => s.Products));
            CreateMap<DocumentProduct, ProductDTO>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Product.Name))
                .ForMember(d => d.MinLimit, o => o.MapFrom(s => s.Product.MinLimit))
                .ForMember(d => d.PriceNetto, o => o.MapFrom(s => s.Product.PriceNetto))
                .ForMember(d => d.SerialNumber, o => o.MapFrom(s => s.Product.SerialNumber))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Product.Category.Name))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Product.Description))
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Product.Id))
                .ForMember(d => d.Quantity, o => o.MapFrom(s => s.Quantity));
            CreateMap<Product, ProductDTO>()
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Name));
            CreateMap<User, Profiles.Profile>();
            CreateMap<Contractor, ContractorDto>();
        
        }
    }
}