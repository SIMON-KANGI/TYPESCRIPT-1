import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement;
    clear(): void;
    render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
    static instance: ListTemplate = new ListTemplate();
    ul: HTMLUListElement;

    private constructor() {
        this.ul = document.getElementById('listItems') as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear();
        fullList.list.forEach(item => {
            const li = document.createElement('li') as HTMLLIElement;
            li.className = 'item';

            const check = document.createElement('input') as HTMLInputElement;
            check.type = "checkbox";
            check.id = item.id;
            check.checked = item.checked;
            li.appendChild(check);

            check.addEventListener('change', () => {
                item.checked = !item.checked;
                fullList.save();
            });

            const label = document.createElement('label') as HTMLLabelElement;
            label.htmlFor = item.id;
            label.innerText = item.item;
            li.append(label);

            const button = document.createElement('button') as HTMLButtonElement;
            button.innerText = 'X';
            button.className = 'button';
            li.append(button);

            button.addEventListener('click', () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            });

            this.ul.append(li);
        });
    }
}
