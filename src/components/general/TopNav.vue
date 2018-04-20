<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar bar1"></span>
                    <span class="icon-bar bar2"></span>
                    <span class="icon-bar bar3"></span>
                </button>
                <a class="navbar-brand" href="#">{{title}}</a>
            </div>
            <div class="collapse navbar-collapse"></div>
        </div>
    </nav>
</template>
<script>
export default{
    name: 'TopNav',
    props: {
        title:{
            default: "Library",
            type: String
        }
    }
}
</script>
