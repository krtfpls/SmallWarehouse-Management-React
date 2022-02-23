using System;
using Application.Core;
using Model;

namespace Application.Documents
{
    public class DocumentParams: PagingParams
    {
        public bool? isIncome {get;set;} = null;
        public Guid? ContractorID {get;set;} = null;
        public DateTime FromDate {get;set;}
        public DateTime? ToDate {get;set;}
    }
}