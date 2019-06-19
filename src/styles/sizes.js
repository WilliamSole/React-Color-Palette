export default {
    up() {

    },
    down(size){
        const sizes = {
            sm: '576px',
            md: '768px',
            lg: '992px'
        }
        return `@media (max-width: ${sizes[size]})`
    }
}