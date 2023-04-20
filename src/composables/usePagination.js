import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default function usePagination() {

    const pagination = ref({});
    const route = useRoute();
    const router = useRouter();

    // Propiedades computadas
    const page = computed(() => {
        let page = route.query.page ?? 1;

        if (page > pagination.value.last_page) {

            router.replace({
                query: {
                    page: pagination.value.last_page
                }
            });

            page = pagination.value.last_page;
        }

        return page;
    });

    // Metodos
    const setPagination = (response) => {
        pagination.value = {
            links: response.meta.links,
            last_page: response.meta.last_page
        };
    };

    const changePage = (url) => {
        /**
         * Obtenemos el valor del query page
         * Luego lo modificamos la URL
         */
        router.replace({
            query: {
                page: url.split('page=')[1]
            }
        });
    };

    return {
        pagination,
        setPagination,
        page,
        changePage
    };
}