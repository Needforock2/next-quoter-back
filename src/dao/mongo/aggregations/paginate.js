export default function paginateArray(array, currentPage, itemsPerPage) {
    // Calcula el índice de inicio del slice en función de la página actual y los elementos por página.
    const startIndex = (currentPage - 1) * itemsPerPage;

    // Utiliza el método slice para obtener los elementos correspondientes a la página actual.
    const paginatedArray = array.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(array.length / itemsPerPage)

    if (!currentPage && !itemsPerPage) {
        return {
          quotes: array,
          totalPages: 1,
          nextPage: null,
          prevPage: null
        };
    }

    return {
        quotes: paginatedArray,
        totalPages,
        nextPage: currentPage + 1 > totalPages ? null : currentPage +1,
        prevPage: currentPage -1 === 0 ? null: currentPage -1
    }





}