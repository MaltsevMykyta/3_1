// Покемоны
const pikachu = {
    name: 'Pikachu',
    health: 100,
    attack() {
        return Math.floor(Math.random() * 10) + 5;
    },
    specialAttack() {
        return Math.floor(Math.random() * 20) + 10;
    }
};

const charmander = {
    name: 'Charmander',
    health: 100,
    attack() {
        return Math.floor(Math.random() * 10) + 5;
    },
    specialAttack() {
        return Math.floor(Math.random() * 20) + 10;
    }
};

// Флаг для предотвращения повторной атаки во время анимации
let isAttacking = false;

// Универсальная функция для обновления прогрессбара
function updateHealthBar(pokemon, healthElement) {
    pokemon.health = Math.max(0, pokemon.health); // Ограничиваем здоровье не ниже 0
    healthElement.style.width = pokemon.health + '%';
    if (pokemon.health <= 0) {
        alert(`${pokemon.name} has fainted!`);
    }
}

// Функция для сброса покебола в исходное положение
function resetPokeball(pokeball) {
    pokeball.style.visibility = 'hidden';
    pokeball.style.top = '50%';
    pokeball.style.left = '50%';
}

// Функция для показа анимации покебола
function showPokeball(attackerId, targetId, onComplete) {
    const pokeball = document.getElementById('pokeball');
    pokeball.style.visibility = 'visible';

    const attackerPos = document.getElementById(attackerId).getBoundingClientRect();
    const targetPos = document.getElementById(targetId).getBoundingClientRect();

    // Устанавливаем начальную позицию покебола
    pokeball.style.top = `${attackerPos.top}px`;
    pokeball.style.left = `${attackerPos.left}px`;

    // Анимация полета к цели
    setTimeout(() => {
        pokeball.style.top = `${targetPos.top}px`;
        pokeball.style.left = `${targetPos.left}px`;
    }, 50);

    setTimeout(() => {
        resetPokeball(pokeball); // Скрываем покебол и сбрасываем его
        onComplete(); // Разрешаем следующую атаку
    }, 800);
}

// Универсальная функция для боя
function battle(attacker, defender, healthBarDefender, attackerId, targetId, isSpecial = false) {
    if (isAttacking) return;
    isAttacking = true;

    const damage = isSpecial ? attacker.specialAttack() : attacker.attack();
    defender.health -= damage;

    showPokeball(attackerId, targetId, () => {
        updateHealthBar(defender, healthBarDefender);
        isAttacking = false;
    });
}

// Получаем элементы прогрессбаров
const health1 = document.getElementById('health1');
const health2 = document.getElementById('health2');

// Назначаем события для кнопок
document.getElementById('attack1').addEventListener('click', () => {
    battle(pikachu, charmander, health2, 'pokemon1', 'pokemon2');
});

document.getElementById('special1').addEventListener('click', () => {
    battle(pikachu, charmander, health2, 'pokemon1', 'pokemon2', true);
});

document.getElementById('attack2').addEventListener('click', () => {
    battle(charmander, pikachu, health1, 'pokemon2', 'pokemon1');
});

document.getElementById('special2').addEventListener('click', () => {
    battle(charmander, pikachu, health1, 'pokemon2', 'pokemon1', true);
});
