"use client";

import { Pagination } from "@heroui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function BookPagination({ totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    
    
    router.push(`${pathname}?${params.toString()}`);
  };

  
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center w-full mt-12 mb-8">
      <Pagination className="justify-center">
        <Pagination.Content>
          
          <Pagination.Item>
            <Pagination.Previous 
              isDisabled={currentPage === 1} 
              onPress={() => handlePageChange(currentPage - 1)}
            >
              <Pagination.PreviousIcon />
              <span className="hidden sm:inline">Previous</span>
            </Pagination.Previous>
          </Pagination.Item>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Pagination.Item key={p}>
              <Pagination.Link 
                isActive={p === currentPage} 
                onPress={() => handlePageChange(p)}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ))}

          <Pagination.Item>
            <Pagination.Next 
              isDisabled={currentPage === totalPages} 
              onPress={() => handlePageChange(currentPage + 1)}
            >
              <span className="hidden sm:inline">Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>

        </Pagination.Content>
      </Pagination>
    </div>
  );
}