/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.y = 2;
var player = {
    pos: new THREE.Vector3(0, 2, 10),
    vel: new THREE.Vector3(0, 0, 0),
    acc: new THREE.Vector3(0, 0, 0),
    hit: false,
    wantX: 0,
    jumping: false
}
var panSpeed = 0.1;

var gravity = new THREE.Vector3(0, -0.1, 0);

var renderer = new THREE.WebGLRenderer({antialias: true});
scene.background = new THREE.Color('#001d45');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

var floorgeo = new THREE.BoxGeometry(30, 0.5, 500);
var floormat = new THREE.MeshLambertMaterial({color: 0x0000aa});
var floormesh = new THREE.Mesh(floorgeo, floormat);
scene.add(floormesh);

var ceilinggeo = new THREE.BoxGeometry(30, 0.5, 500);
var ceilingmat = new THREE.MeshLambertMaterial({color: 0x0000aa});
var ceilingmesh = new THREE.Mesh(ceilinggeo, ceilingmat);
scene.add(ceilingmesh);
ceilingmesh.position.y = 15;

scene.fog = new THREE.Fog('#001d45', 10, 300);

var cones = [];
for (var i = 0; i < 1000; i++) {
    let h = 5;
    if (Math.random() <= 0.33) h = 10;
    var geometry = new THREE.ConeGeometry(3, h, 10);
    var material = new THREE.MeshBasicMaterial({color: '#fcba03'});
    var cone = new THREE.Mesh(geometry, material);
    cones.push(cone);
    scene.add(cone);
    cone.position.z = -i * 30 - 30;
    cone.originalZ = -i * 30 - 30;
    cone.h = h;
    if (Math.random() <= 0.5) {
        cone.position.y = 15;
        cone.rotation.z = Math.PI;
    }
    let dirR = Math.random();
    if (dirR <= .33) cone.position.x = -7.5;
    if (dirR >= .66) cone.position.x = 7.5;
}

var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

var light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(10, 7.5, player.pos.z);
scene.add(light);

var render = () => {
    requestAnimationFrame(render);

    let dead = false;
    for (var i = 0; i < cones.length; i++) {
        cones[i].position.z += panSpeed;


        let dist = player.pos.distanceTo(cones[i].position);
        let size = 3;
        if (cones[i].h > 5) size = 5;
        if (Math.floor(dist) < size && !player.hit) {
            dead = true;
            panSpeed = 0.001;
            $(".lastScore").html("上局分数: " + Math.floor(cones[0].position.z + 30))
            $(".lose").addClass("show");
            setTimeout(() => {
                $(".lose").removeClass("show");
            }, 1000)
        }
    }

    panSpeed += 0.001;

    if (dead) {
        player.hit = true;
        setTimeout(() => {
            player.hit = false;
        }, 1000)
        for (var i = 0; i < cones.length; i++) {
            this.tl = new TimelineMax();
            this.tl.to(cones[i].position, 1, {z: cones[i].originalZ});
        }
    }

    player.acc.add(gravity);

    player.vel.add(player.acc);
    player.pos.add(player.vel);
    player.acc.set(0, 0, 0);

    if (player.wantX > player.pos.x) player.pos.x++;
    if (player.wantX < player.pos.x) player.pos.x--;

    if (player.pos.y >= 13 && camera.rotation.z !== 0 || player.pos.y <= 2 && camera.rotation.z == 0) {
        player.jumping = false;
        player.vel.y = 0;
    }

    player.pos.clamp(new THREE.Vector3(-7.5, 2, 10), new THREE.Vector3(7.5, 13, 10));

    light.position.set(10, 7.5, player.pos.z);
    camera.position.set(player.pos.x, player.pos.y, player.pos.z);

    $(".score").html("当前分数: " + Math.floor(cones[0].position.z + 30));

    renderer.render(scene, camera);
}
render();

document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp") {
        gravity.y *= -1;
        player.vel.y = 0;
        this.tl = new TimelineMax();
        if (camera.rotation.z == 0) {
            this.tl.to(camera.rotation, .2, {z: Math.PI});
        } else {
            this.tl.to(camera.rotation, .2, {z: Math.PI * 2});
            this.tl.to(camera.rotation, 0, {z: 0});
        }
    }
    if (camera.rotation.z == 0) {
        if (e.code === "Space" && !player.jumping) {
            player.jumping = true;
            player.acc.y += 1.2;
        }
        if (e.code === "ArrowLeft") {
            if (player.wantX >= 0) player.wantX -= 7.5;
        }
        if (e.code === "ArrowRight") {
            if (player.wantX <= 0) player.wantX += 7.5;
        }
    } else {
        if (e.code === "Space" && !player.jumping) {
            player.jumping = true;
            player.acc.y -= 1.2;
        }
        if (e.code === "ArrowRight") {
            if (player.wantX >= 0) player.wantX -= 7.5;
        }
        if (e.code === "ArrowLeft") {
            if (player.wantX <= 0) player.wantX += 7.5;
        }
    }
});
