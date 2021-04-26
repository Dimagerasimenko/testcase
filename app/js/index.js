window.addEventListener('DOMContentLoaded', () => {
    const checkItem = document.querySelector('.checkbox__item'),
        cargoTemparute = document.querySelector('.cargo__part-two'),
        checkMark = checkItem.querySelector('.check-mark');


    function toogleCondition(elem, className) {
        if (!elem.classList.contains(className)) {
            elem.classList.add(className);

        } else {
            elem.classList.remove(className);
        }
    }


    checkItem.addEventListener('click', (e) => {
        toogleCondition(checkItem, 'checkbox__checked');
        toogleCondition(cargoTemparute, 'hide');
        toogleCondition(checkMark, 'visi-hidden');
    });


    const list = document.querySelectorAll('.select');


    list.forEach(i => {
        i.addEventListener('click', () => {
            const arDown = i.querySelector('.arrow-down'),
                arUp = i.querySelector('.arrow-up'),
                dropList = i.querySelector('.select__dropdown-list'),
                text = i.querySelector('.select-text'),
                listItem = i.querySelectorAll('.list__item'),
                inputValue = i.querySelector('input');
            toogleCondition(arDown, 'hide');
            toogleCondition(arUp, 'hide');
            toogleCondition(dropList, 'hide');

            if (dropList.classList.contains('hide')) {
                listItem.forEach(item => {
                    item.addEventListener('click', () => {
                        inputValue.value = item.getAttribute('data-value');
                        text.innerHTML = item.getAttribute('data-value');
                        text.style.color = 'black';
                    })
                })
            }


        })
    });


});


