import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { LocalsPage } from './locals.page';

describe('LocalsPage', () => {
  let fixture: ComponentFixture<LocalsPage>;
  let component: LocalsPage;
  let el: HTMLElement;

  beforeEach(async () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // Limpa o localStorage antes de cada teste
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [LocalsPage, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalsPage);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  // ─── Renderização inicial ──────────────────────────────────────────────────

  it('deve criar com view "list" e renderizar page-header', () => {
    expect(component).toBeTruthy();
    expect(component.view()).toBe('list');
    expect(el.querySelector('app-page-header')).toBeTruthy();
    expect(el.querySelector('app-form-container')).toBeNull();
  });

  // ─── openForm / closeForm ─────────────────────────────────────────────────

  describe('openForm / closeForm', () => {
    it('deve abrir formulário e resetar valores', () => {
      component['form'].patchValue({ name: 'editado', category: 'Hotel' });

      component.openForm();
      fixture.detectChanges();

      expect(component.view()).toBe('form');
      expect(component['form'].controls.name.value).toBe('');
      expect(el.querySelector('app-form-container')).toBeTruthy();
    });

    it('deve fechar formulário e voltar para list', () => {
      component.openForm();
      component.closeForm();
      expect(component.view()).toBe('list');
    });

    it('deve limpar editingId ao fechar formulário', () => {
      const local = { id: '123', name: 'Local', phone: '', description: '', latitude: '-23', longitude: '-51', category: 'Parque', photos: null };
      component['openEdit'](local);
      expect(component['editingId']()).toBe('123');

      component.closeForm();
      expect(component['editingId']()).toBeNull();
    });
  });

  // ─── defaultFormValues ────────────────────────────────────────────────────

  describe('defaultFormValues', () => {
    it('deve retornar valores padrão corretos', () => {
      expect(component['defaultFormValues']()).toEqual({
        name: '',
        phone: '',
        description: '',
        latitude: '',
        longitude: '',
        category: '',
        photos: null,
      });
    });
  });

  // ─── nameError / nameTouched ──────────────────────────────────────────────

  describe('nameError / nameTouched', () => {
    it('deve retornar required quando vazio', () => {
      const ctrl = component['form'].controls.name;
      ctrl.setValue('');
      ctrl.markAsTouched();
      expect(component.nameTouched).toBe(true);
      expect(component.nameError).toBe('Nome é obrigatório.');
    });

    it('deve retornar string vazia quando válido', () => {
      component['form'].controls.name.setValue('Meu Local');
      expect(component.nameError).toBe('');
    });
  });

  // ─── latitudeError / latitudeTouched ─────────────────────────────────────

  describe('latitudeError / latitudeTouched', () => {
    it('deve retornar required quando vazio', () => {
      const ctrl = component['form'].controls.latitude;
      ctrl.setValue('');
      ctrl.markAsTouched();
      expect(component.latitudeTouched).toBe(true);
      expect(component.latitudeError).toBe('Latitude é obrigatória.');
    });

    it('deve retornar string vazia quando preenchido', () => {
      component['form'].controls.latitude.setValue('-23.4253');
      expect(component.latitudeError).toBe('');
    });
  });

  // ─── longitudeError / longitudeTouched ────────────────────────────────────

  describe('longitudeError / longitudeTouched', () => {
    it('deve retornar required quando vazio', () => {
      const ctrl = component['form'].controls.longitude;
      ctrl.setValue('');
      ctrl.markAsTouched();
      expect(component.longitudeTouched).toBe(true);
      expect(component.longitudeError).toBe('Longitude é obrigatória.');
    });

    it('deve retornar string vazia quando preenchido', () => {
      component['form'].controls.longitude.setValue('-51.9383');
      expect(component.longitudeError).toBe('');
    });
  });

  // ─── categoryError / categoryTouched ──────────────────────────────────────

  describe('categoryError / categoryTouched', () => {
    it('deve retornar required quando não selecionado', () => {
      const ctrl = component['form'].controls.category;
      ctrl.setValue('');
      ctrl.markAsTouched();
      expect(component.categoryTouched).toBe(true);
      expect(component.categoryError).toBe('Categoria é obrigatória.');
    });

    it('deve retornar string vazia quando selecionado', () => {
      component['form'].controls.category.setValue('Restaurante');
      expect(component.categoryError).toBe('');
    });
  });

  // ─── photosError / photosTouched ──────────────────────────────────────────

  describe('photosError / photosTouched', () => {
    it('deve retornar required quando não há fotos', () => {
      const ctrl = component['form'].controls.photos;
      ctrl.setValue(null);
      ctrl.markAsTouched();
      expect(component.photosTouched).toBe(true);
      expect(component.photosError).toBe('Adicione ao menos uma foto.');
    });
  });

  // ─── categories ───────────────────────────────────────────────────────────

  describe('categories', () => {
    it('deve conter as categorias esperadas', () => {
      expect(component['categories']).toContain('Restaurante');
      expect(component['categories']).toContain('Hotel');
      expect(component['categories']).toContain('Parque');
      expect(component['categories']).toContain('Hospital');
      expect(component['categories']).toContain('Outro');
    });
  });

  // ─── openEdit ─────────────────────────────────────────────────────────────

  describe('openEdit', () => {
    it('deve preencher o formulário com os dados do local e setar editingId', () => {
      const local = {
        id: 'abc-123',
        name: 'Parque Central',
        phone: '99999-9999',
        description: 'Um parque bonito',
        latitude: '-23.4253',
        longitude: '-51.9383',
        category: 'Parque',
        photos: null,
      };

      component['openEdit'](local);
      fixture.detectChanges();

      expect(component['editingId']()).toBe('abc-123');
      expect(component.view()).toBe('form');
      expect(component['form'].controls.name.value).toBe('Parque Central');
      expect(component['form'].controls.category.value).toBe('Parque');
    });

    it('deve remover validator de photos ao editar', () => {
      const local = { id: '1', name: 'X', phone: '', description: '', latitude: '0', longitude: '0', category: 'Outro', photos: null };
      component['openEdit'](local);

      expect(component['form'].controls.photos.validator).toBeNull();
    });
  });

  // ─── deleteLocal ──────────────────────────────────────────────────────────

  describe('deleteLocal', () => {
    it('deve remover local do localStorage quando confirmado', () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true);

      const locais = [
        { id: '1', name: 'A', phone: '', description: '', latitude: '0', longitude: '0', category: 'Outro', photos: null },
        { id: '2', name: 'B', phone: '', description: '', latitude: '0', longitude: '0', category: 'Outro', photos: null },
      ];
      localStorage.setItem('locais', JSON.stringify(locais));

      component['deleteLocal']('1');

      const saved = JSON.parse(localStorage.getItem('locais') ?? '[]');
      expect(saved).toHaveLength(1);
      expect(saved[0].id).toBe('2');
    });

    it('não deve remover quando cancelado no confirm', () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false);

      const locais = [{ id: '1', name: 'A', phone: '', description: '', latitude: '0', longitude: '0', category: 'Outro', photos: null }];
      localStorage.setItem('locais', JSON.stringify(locais));

      component['deleteLocal']('1');

      const saved = JSON.parse(localStorage.getItem('locais') ?? '[]');
      expect(saved).toHaveLength(1);
    });
  });

  // ─── onSubmit ─────────────────────────────────────────────────────────────

  describe('onSubmit', () => {
    it('deve marcar todos os campos como touched e não salvar quando inválido', () => {
      component.openForm();
      component.onSubmit();

      expect(component['form'].controls.name.touched).toBe(true);
      expect(component['form'].controls.latitude.touched).toBe(true);
      expect(component['form'].controls.longitude.touched).toBe(true);
      expect(component['form'].controls.category.touched).toBe(true);

      const saved = JSON.parse(localStorage.getItem('locais') ?? '[]');
      expect(saved).toHaveLength(0);
    });

    it('deve salvar no localStorage e voltar para list quando válido', () => {
      component.openForm();
      component['form'].patchValue({
        name: 'Parque Central',
        phone: '99999-9999',
        description: 'Descrição do local',
        latitude: '-23.4253',
        longitude: '-51.9383',
        category: 'Parque',
      });
      component['form'].controls.photos.setValue({} as FileList);

      component.onSubmit();

      expect(component.view()).toBe('list');
      const saved = JSON.parse(localStorage.getItem('locais') ?? '[]');
      expect(saved).toHaveLength(1);
      expect(saved[0].name).toBe('Parque Central');
    });

    it('deve editar local existente e não duplicar', () => {
      const existing = [{ id: 'id-1', name: 'Antigo', phone: '', description: '', latitude: '0', longitude: '0', category: 'Outro', photos: null }];
      localStorage.setItem('locais', JSON.stringify(existing));

      component['openEdit'](existing[0]);
      component['form'].patchValue({ name: 'Novo Nome' });
      component.onSubmit();

      const saved = JSON.parse(localStorage.getItem('locais') ?? '[]');
      expect(saved).toHaveLength(1);
      expect(saved[0].name).toBe('Novo Nome');
    });

    it('deve limpar editingId e restaurar validator de photos após submit', () => {
      const existing = [{ id: 'id-1', name: 'Local', phone: '', description: '', latitude: '0', longitude: '0', category: 'Outro', photos: null }];
      localStorage.setItem('locais', JSON.stringify(existing));

      component['openEdit'](existing[0]);
      component['form'].patchValue({ name: 'Local Editado' });
      component.onSubmit();

      expect(component['editingId']()).toBeNull();
      expect(component['form'].controls.photos.validator).not.toBeNull();
    });
  });

  // ─── validação do formulário ──────────────────────────────────────────────

  describe('validação do formulário', () => {
    it('deve estar inválido sem os campos obrigatórios', () => {
      expect(component['form'].valid).toBe(false);
    });

    it('deve ser válido com todos os campos obrigatórios preenchidos', () => {
      component['form'].patchValue({
        name: 'Local Válido',
        latitude: '-23.4253',
        longitude: '-51.9383',
        category: 'Restaurante',
      });
      component['form'].controls.photos.setValue({} as FileList);

      expect(component['form'].valid).toBe(true);
    });
  });
});