<template>
    <div class="sidebar" data-background-color="black" data-active-color="danger">

    <!--
    Tip 1: you can change the color of the sidebar's background using: data-background-color="white | black"
    Tip 2: you can change the color of the active button using the data-active-color="primary | info | success | warning | danger"
-->

<div class="sidebar-wrapper">
    <div class="logo">
        <a href="http://www.creative-tim.com" class="simple-text">
            Library
        </a>
    </div>

    <ul class="nav">
        <li>
            <router-link to="/books"  active-class="active" ><i class="ti-book"></i>Books</router-link>
        </li>
        <li>
            <router-link to="/user"><i class="ti-user"></i>User</router-link>
        </li>
    </ul>
</div>
</div>
</template>